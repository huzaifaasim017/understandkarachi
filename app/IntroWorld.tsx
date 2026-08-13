"use client";

import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { DistrictId } from "./karachi-data";
import { districts, mainCorridors } from "./karachi-data";
import type { Locale } from "./karachi-i18n";

type IntroWorldProps = {
  readonly locale: Locale;
  readonly reducedMotion: boolean;
  readonly onReducedMotionChange: (reduced: boolean) => void;
};

type Coordinate = readonly [longitude: number, latitude: number];

type DistrictFeature = {
  readonly properties: {
    readonly id: DistrictId;
    readonly color?: string;
  };
  readonly geometry:
    | { readonly type: "Polygon"; readonly coordinates: readonly (readonly Coordinate[])[] }
    | { readonly type: "MultiPolygon"; readonly coordinates: readonly (readonly (readonly Coordinate[])[])[] };
};

type DistrictCollection = {
  readonly features: readonly DistrictFeature[];
};

type DistrictMeshHandle = {
  readonly material: {
    opacity: number;
    emissiveIntensity: number;
  };
  readonly scale: {
    setScalar: (value: number) => void;
  };
};

const copy = {
  "ur-roman": {
    aria: "Karachi ke saat zilon aur bari roads ka 3D naqsha",
    north: "NORTH · M-9",
    south: "SOUTH · ARABIAN SEA",
    hint: "Map ya district name select karein",
    area: "area",
    anchor: "pehchan",
    road: "main road",
    open: "District detail",
    loading: "Karachi geometry load ho rahi hai…",
    unavailable: "3D map load nahi hua. Neeche district buttons se wohi maloomat milti hai.",
    pause: "Map rokain",
    play: "Map chalayein",
  },
  en: {
    aria: "3D map of Karachi's seven districts and major roads",
    north: "NORTH · M-9",
    south: "SOUTH · ARABIAN SEA",
    hint: "Select the map or a district name",
    area: "area",
    anchor: "anchor",
    road: "main road",
    open: "District detail",
    loading: "Loading Karachi geometry…",
    unavailable: "The 3D map did not load. The district buttons below provide the same information.",
    pause: "Pause map",
    play: "Play map",
  },
} as const;

function polygonsFor(feature: DistrictFeature) {
  return feature.geometry.type === "Polygon"
    ? [feature.geometry.coordinates]
    : feature.geometry.coordinates;
}

export default function IntroWorld({
  locale,
  reducedMotion,
  onReducedMotionChange,
}: IntroWorldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const meshesRef = useRef(new Map<DistrictId, DistrictMeshHandle>());
  const selectedRef = useRef<DistrictId>("south");
  const lockedRef = useRef<DistrictId>("south");
  const reducedMotionRef = useRef(reducedMotion);
  const resumeAnimationRef = useRef<() => void>(() => undefined);
  const [selectedDistrictId, setSelectedDistrictId] = useState<DistrictId>("south");
  const [loadState, setLoadState] = useState<"loading" | "ready" | "unavailable">("loading");
  const selectedDistrict = districts.find((district) => district.id === selectedDistrictId) ?? districts[0];
  const text = copy[locale];

  const selectDistrict = (districtId: DistrictId, lock = false) => {
    selectedRef.current = districtId;
    if (lock) lockedRef.current = districtId;
    setSelectedDistrictId(districtId);
  };

  useEffect(() => {
    selectedRef.current = selectedDistrictId;
    for (const [districtId, mesh] of meshesRef.current) {
      const active = districtId === selectedDistrictId;
      mesh.material.opacity = active ? 1 : 0.72;
      mesh.material.emissiveIntensity = active ? 0.38 : 0.1;
      mesh.scale.setScalar(active ? 1.025 : 1);
    }
  }, [selectedDistrictId]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
    resumeAnimationRef.current();
  }, [reducedMotion]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([
      import("three"),
      fetch("/data/karachi-districts.geojson").then((response) => {
        if (!response.ok) throw new Error(`District geometry failed: ${response.status}`);
        return response.json() as Promise<DistrictCollection>;
      }),
    ]).then(([THREE, collection]) => {
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        mount.dataset.webgl = "unavailable";
        setLoadState("unavailable");
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.touchAction = "pan-y";
      renderer.domElement.style.cursor = "pointer";
      mount.prepend(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, -6.1, 9.4);
      camera.lookAt(0, 0.25, 0);

      const root = new THREE.Group();
      root.position.set(0, 0.15, 0);
      scene.add(root);

      const allCoordinates = collection.features.flatMap((feature) =>
        polygonsFor(feature).flatMap((polygon) => polygon.flatMap((ring) => ring)),
      );
      const longitudes = allCoordinates.map((coordinate) => coordinate[0]);
      const latitudes = allCoordinates.map((coordinate) => coordinate[1]);
      const minLongitude = Math.min(...longitudes);
      const maxLongitude = Math.max(...longitudes);
      const minLatitude = Math.min(...latitudes);
      const maxLatitude = Math.max(...latitudes);
      const centerLongitude = (minLongitude + maxLongitude) / 2;
      const centerLatitude = (minLatitude + maxLatitude) / 2;
      const longitudeFactor = Math.cos(centerLatitude * Math.PI / 180);
      const scale = 6.4 / Math.max(
        (maxLongitude - minLongitude) * longitudeFactor,
        maxLatitude - minLatitude,
      );
      const project = ([longitude, latitude]: Coordinate) => new THREE.Vector3(
        (longitude - centerLongitude) * longitudeFactor * scale,
        (latitude - centerLatitude) * scale,
        0,
      );

      const sea = new THREE.Mesh(
        new THREE.PlaneGeometry(9.4, 8.4),
        new THREE.MeshPhysicalMaterial({
          color: 0x073743,
          roughness: 0.68,
          metalness: 0.05,
          transparent: true,
          opacity: 0.82,
        }),
      );
      sea.position.z = -0.12;
      root.add(sea);

      const grid = new THREE.GridHelper(9, 18, 0x3b7d86, 0x24515b);
      grid.rotation.x = Math.PI / 2;
      grid.position.z = -0.09;
      const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
      gridMaterials.forEach((material) => {
        material.transparent = true;
        material.opacity = 0.22;
      });
      root.add(grid);

      const districtObjects: InstanceType<typeof THREE.Mesh>[] = [];
      const labelTextures: InstanceType<typeof THREE.CanvasTexture>[] = [];
      for (const feature of collection.features) {
        const district = districts.find((item) => item.id === feature.properties.id);
        if (!district) continue;

        for (const polygon of polygonsFor(feature)) {
          const [outerRing, ...innerRings] = polygon;
          if (!outerRing?.length) continue;
          const shape = new THREE.Shape();
          outerRing.forEach((coordinate, index) => {
            const point = project(coordinate);
            if (index === 0) shape.moveTo(point.x, point.y);
            else shape.lineTo(point.x, point.y);
          });
          innerRings.forEach((ring) => {
            const hole = new THREE.Path();
            ring.forEach((coordinate, index) => {
              const point = project(coordinate);
              if (index === 0) hole.moveTo(point.x, point.y);
              else hole.lineTo(point.x, point.y);
            });
            shape.holes.push(hole);
          });

          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 0.14,
            bevelEnabled: true,
            bevelSegments: 1,
            bevelSize: 0.018,
            bevelThickness: 0.015,
          });
          const material = new THREE.MeshStandardMaterial({
            color: district.color,
            emissive: new THREE.Color(district.color),
            emissiveIntensity: district.id === selectedRef.current ? 0.38 : 0.1,
            roughness: 0.62,
            metalness: 0.03,
            transparent: true,
            opacity: district.id === selectedRef.current ? 1 : 0.72,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.userData.districtId = district.id;
          root.add(mesh);
          districtObjects.push(mesh);
          meshesRef.current.set(district.id, mesh);

          const edge = new THREE.LineSegments(
            new THREE.EdgesGeometry(geometry, 24),
            new THREE.LineBasicMaterial({ color: 0xfff5df, transparent: true, opacity: 0.42 }),
          );
          mesh.add(edge);
        }

        const labelCanvas = document.createElement("canvas");
        labelCanvas.width = 512;
        labelCanvas.height = 128;
        const labelContext = labelCanvas.getContext("2d");
        if (labelContext) {
          labelContext.fillStyle = "rgba(7, 28, 36, 0.88)";
          labelContext.beginPath();
          labelContext.roundRect(8, 8, 496, 112, 32);
          labelContext.fill();
          labelContext.strokeStyle = district.color;
          labelContext.lineWidth = 7;
          labelContext.stroke();
          labelContext.fillStyle = "#fff7e8";
          labelContext.font = "700 48px Arial, sans-serif";
          labelContext.textAlign = "center";
          labelContext.textBaseline = "middle";
          labelContext.fillText(district.name, 256, 65);

          const labelTexture = new THREE.CanvasTexture(labelCanvas);
          labelTexture.colorSpace = THREE.SRGBColorSpace;
          labelTexture.minFilter = THREE.LinearFilter;
          labelTextures.push(labelTexture);
          const labelMaterial = new THREE.SpriteMaterial({
            map: labelTexture,
            transparent: true,
            depthTest: false,
            toneMapped: false,
          });
          const label = new THREE.Sprite(labelMaterial);
          const labelOffsets: Readonly<Record<DistrictId, readonly [number, number]>> = {
            central: [-0.05, 0.42],
            east: [0.5, 0.12],
            south: [-0.08, -0.34],
            west: [-0.48, 0.42],
            keamari: [-0.58, -0.08],
            korangi: [0.48, -0.32],
            malir: [0.38, 0.16],
          };
          label.position.copy(project(district.coordinates));
          label.position.x += labelOffsets[district.id][0];
          label.position.y += labelOffsets[district.id][1];
          label.position.z = 0.4;
          label.scale.set(0.82, 0.205, 1);
          label.renderOrder = 8;
          root.add(label);
        }
      }

      const packetMovers: Array<(progress: number) => void> = [];
      mainCorridors.forEach((corridor, corridorIndex) => {
        const points = corridor.path.map((coordinate) => {
          const point = project(coordinate);
          point.z = 0.22;
          return point;
        });
        if (points.length < 2) return;
        const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
        const sampled = curve.getPoints(Math.max(24, points.length * 9));
        const geometry = new THREE.BufferGeometry().setFromPoints(sampled);
        const line = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ color: corridor.color, transparent: true, opacity: 0.88 }),
        );
        line.renderOrder = 3;
        root.add(line);

        if (corridorIndex < 7) {
          const packet = new THREE.Mesh(
            new THREE.SphereGeometry(0.035, 10, 10),
            new THREE.MeshBasicMaterial({ color: 0xfff3d8, toneMapped: false }),
          );
          packet.renderOrder = 4;
          root.add(packet);
          packetMovers.push((progress) => {
            packet.position.copy(curve.getPointAt((progress + corridorIndex * 0.137) % 1));
          });
        }
      });

      scene.add(new THREE.HemisphereLight(0xfff4df, 0x07313b, 2.15));
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
      keyLight.position.set(-4, -3, 8);
      scene.add(keyLight);
      const rimLight = new THREE.DirectionalLight(0x59cbd0, 1.8);
      rimLight.position.set(4, 4, 5);
      scene.add(rimLight);

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const districtAtPointer = (event: PointerEvent) => {
        const bounds = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(districtObjects, false)[0];
        return hit?.object.userData.districtId as DistrictId | undefined;
      };
      const onPointerMove = (event: PointerEvent) => {
        const districtId = districtAtPointer(event);
        renderer.domElement.style.cursor = districtId ? "pointer" : "default";
        if (districtId && districtId !== selectedRef.current) selectDistrict(districtId);
      };
      const onPointerLeave = () => selectDistrict(lockedRef.current);
      const onPointerClick = (event: PointerEvent) => {
        const districtId = districtAtPointer(event);
        if (districtId) selectDistrict(districtId, true);
      };
      renderer.domElement.addEventListener("pointermove", onPointerMove);
      renderer.domElement.addEventListener("pointerleave", onPointerLeave);
      renderer.domElement.addEventListener("click", onPointerClick);

      const resize = () => {
        const width = Math.max(1, mount.clientWidth);
        const height = Math.max(1, mount.clientHeight);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      resize();

      const clock = new THREE.Clock();
      let frame = 0;
      const animate = () => {
        frame = 0;
        if (disposed) return;
        const progress = (clock.getElapsedTime() * 0.055) % 1;
        packetMovers.forEach((move) => move(progress));
        renderer.render(scene, camera);
        if (!reducedMotionRef.current) frame = window.requestAnimationFrame(animate);
      };
      resumeAnimationRef.current = () => {
        if (reducedMotionRef.current) {
          if (frame) window.cancelAnimationFrame(frame);
          frame = 0;
          renderer.render(scene, camera);
        } else if (!frame) {
          frame = window.requestAnimationFrame(animate);
        }
      };
      resumeAnimationRef.current();
      mount.dataset.webgl = "ready";
      setLoadState("ready");

      cleanup = () => {
        if (frame) window.cancelAnimationFrame(frame);
        resumeAnimationRef.current = () => undefined;
        resizeObserver.disconnect();
        renderer.domElement.removeEventListener("pointermove", onPointerMove);
        renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
        renderer.domElement.removeEventListener("click", onPointerClick);
        scene.traverse((object) => {
          if ("geometry" in object && object.geometry instanceof THREE.BufferGeometry) object.geometry.dispose();
          if ("material" in object) {
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
        labelTextures.forEach((texture) => texture.dispose());
        renderer.dispose();
        renderer.domElement.remove();
        meshesRef.current.clear();
      };
    }).catch(() => {
      if (!disposed) {
        mount.dataset.webgl = "unavailable";
        setLoadState("unavailable");
      }
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section className="intro-world" aria-label={text.aria}>
      <div className="intro-world-canvas" ref={mountRef}>
        <span className="intro-map-loading" role="status">
          {loadState === "unavailable" ? text.unavailable : text.loading}
        </span>
      </div>
      <span className="intro-map-north">{text.north}</span>
      <span className="intro-map-south">{text.south}</span>
      <div className="intro-map-panel">
        <p>{text.hint}</p>
        <div className="intro-district-buttons">
          {districts.map((district) => (
            <button
              key={district.id}
              type="button"
              className={district.id === selectedDistrict.id ? "is-active" : ""}
              style={{ "--district-color": district.color } as React.CSSProperties}
              onPointerEnter={() => selectDistrict(district.id)}
              onFocus={() => selectDistrict(district.id)}
              onClick={() => selectDistrict(district.id, true)}
              aria-pressed={district.id === selectedDistrict.id}
            >
              {district.name}
            </button>
          ))}
        </div>
        <div className="intro-map-detail" aria-live="polite">
          <strong>{selectedDistrict.name}</strong>
          <span>{selectedDistrict.areaKm2.toLocaleString("en-US")} km² {text.area}</span>
          <span>{text.anchor}: {selectedDistrict.anchor}</span>
          <span>{text.road}: {selectedDistrict.mainCorridor}</span>
          <Link href={`/districts/${selectedDistrict.id}`}>
            {text.open}<ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
      {loadState === "ready" && (
        <button
          type="button"
          className="intro-motion-control"
          onClick={() => onReducedMotionChange(!reducedMotion)}
          aria-pressed={reducedMotion}
        >
          {reducedMotion ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {reducedMotion ? text.play : text.pause}
        </button>
      )}
    </section>
  );
}
