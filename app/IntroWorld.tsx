"use client";

import { useEffect, useRef } from "react";

type IntroWorldProps = {
  reducedMotion: boolean;
};

type Coordinate = readonly [longitude: number, latitude: number];

const KARACHI = { latitude: 24.8607, longitude: 67.0011 } as const;

const ROUTE_ORIGINS = [
  { coordinates: [55.2708, 25.2048] as Coordinate, color: 0xf2b99c, speed: 0.092 },
  { coordinates: [72.8777, 19.076] as Coordinate, color: 0x75d4d2, speed: 0.078 },
  { coordinates: [77.209, 28.6139] as Coordinate, color: 0x75d4d2, speed: 0.084 },
  { coordinates: [58.4059, 23.588] as Coordinate, color: 0xf2b99c, speed: 0.088 },
  { coordinates: [28.9784, 41.0082] as Coordinate, color: 0x75d4d2, speed: 0.06 },
  { coordinates: [103.8198, 1.3521] as Coordinate, color: 0xf2b99c, speed: 0.054 },
] as const;

// Deliberately low-detail silhouettes: enough geographic context to make the
// globe legible without downloading a texture before the story can begin.
const LANDMASSES: readonly (readonly Coordinate[])[] = [
  [[-10, 36], [-8, 57], [18, 72], [65, 78], [120, 73], [170, 62], [178, 48], [145, 35], [130, 18], [105, 7], [98, 20], [83, 8], [68, 23], [52, 13], [42, 29], [25, 35]],
  [[-17, 36], [10, 37], [32, 31], [51, 12], [43, -12], [32, -35], [18, -35], [5, -20], [-6, 5], [-17, 15]],
  [[-168, 61], [-140, 72], [-95, 76], [-55, 55], [-66, 42], [-82, 25], [-105, 20], [-125, 33], [-150, 48]],
  [[-81, 12], [-66, 10], [-49, -5], [-35, -22], [-55, -55], [-74, -44], [-80, -8]],
  [[112, -11], [154, -10], [153, -39], [133, -44], [113, -31]],
  [[-52, 60], [-21, 70], [-30, 83], [-55, 82], [-72, 70]],
] as const;

function pointInPolygon(longitude: number, latitude: number, polygon: readonly Coordinate[]) {
  let inside = false;
  for (let current = 0, previous = polygon.length - 1; current < polygon.length; previous = current++) {
    const [currentLongitude, currentLatitude] = polygon[current];
    const [previousLongitude, previousLatitude] = polygon[previous];
    const intersects = currentLatitude > latitude !== previousLatitude > latitude
      && longitude < ((previousLongitude - currentLongitude) * (latitude - currentLatitude))
        / (previousLatitude - currentLatitude) + currentLongitude;
    if (intersects) inside = !inside;
  }
  return inside;
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export default function IntroWorld({ reducedMotion }: IntroWorldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void import("three")
      .then((THREE) => {
        if (disposed) return;

        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
        } catch {
          mount.dataset.webgl = "unavailable";
          return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(Math.max(1, mount.clientWidth), Math.max(1, mount.clientHeight));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.inset = "0";
        renderer.domElement.style.zIndex = "1";
        renderer.domElement.style.touchAction = "pan-y";
        renderer.domElement.style.cursor = reducedMotion ? "default" : "grab";
        renderer.domElement.setAttribute("aria-hidden", "true");
        mount.insertBefore(renderer.domElement, mount.firstChild);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          34,
          Math.max(1, mount.clientWidth) / Math.max(1, mount.clientHeight),
          0.1,
          100,
        );
        camera.position.set(0, 0.08, 5.72);

        const worldRoot = new THREE.Group();
        const earthRoot = new THREE.Group();
        worldRoot.add(earthRoot);
        scene.add(worldRoot);

        const toVector = (latitude: number, longitude: number, radius: number) => {
          const latitudeRadians = THREE.MathUtils.degToRad(latitude);
          const longitudeRadians = THREE.MathUtils.degToRad(longitude);
          return new THREE.Vector3(
            radius * Math.cos(latitudeRadians) * Math.cos(longitudeRadians),
            radius * Math.sin(latitudeRadians),
            radius * Math.cos(latitudeRadians) * Math.sin(longitudeRadians),
          );
        };

        const ocean = new THREE.Mesh(
          new THREE.SphereGeometry(1.55, 64, 48),
          new THREE.MeshPhysicalMaterial({
            color: 0x073946,
            emissive: 0x042a33,
            emissiveIntensity: 0.75,
            roughness: 0.42,
            metalness: 0.08,
            clearcoat: 0.42,
            clearcoatRoughness: 0.45,
          }),
        );
        earthRoot.add(ocean);

        const gridPositions: number[] = [];
        const addGridSegment = (start: InstanceType<typeof THREE.Vector3>, end: InstanceType<typeof THREE.Vector3>) => {
          gridPositions.push(start.x, start.y, start.z, end.x, end.y, end.z);
        };
        for (let latitude = -60; latitude <= 60; latitude += 30) {
          for (let longitude = -180; longitude < 180; longitude += 4) {
            addGridSegment(toVector(latitude, longitude, 1.558), toVector(latitude, longitude + 4, 1.558));
          }
        }
        for (let longitude = -150; longitude <= 180; longitude += 30) {
          for (let latitude = -88; latitude < 88; latitude += 4) {
            addGridSegment(toVector(latitude, longitude, 1.558), toVector(latitude + 4, longitude, 1.558));
          }
        }
        const gridGeometry = new THREE.BufferGeometry();
        gridGeometry.setAttribute("position", new THREE.Float32BufferAttribute(gridPositions, 3));
        const grid = new THREE.LineSegments(
          gridGeometry,
          new THREE.LineBasicMaterial({
            color: 0x7bc4c7,
            transparent: true,
            opacity: 0.115,
            depthWrite: false,
          }),
        );
        earthRoot.add(grid);

        const landPositions: number[] = [];
        let landSeed = 1;
        for (let latitude = -56; latitude <= 80; latitude += 3.4) {
          for (let longitude = -178; longitude <= 178; longitude += 3.4) {
            if (!LANDMASSES.some((polygon) => pointInPolygon(longitude, latitude, polygon))) continue;
            const longitudeJitter = (seededRandom(landSeed++) - 0.5) * 1.65;
            const latitudeJitter = (seededRandom(landSeed++) - 0.5) * 1.65;
            const point = toVector(latitude + latitudeJitter, longitude + longitudeJitter, 1.566);
            landPositions.push(point.x, point.y, point.z);
          }
        }
        const landGeometry = new THREE.BufferGeometry();
        landGeometry.setAttribute("position", new THREE.Float32BufferAttribute(landPositions, 3));
        const land = new THREE.Points(
          landGeometry,
          new THREE.PointsMaterial({
            color: 0xd8c9a7,
            size: 0.022,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.68,
            depthWrite: false,
          }),
        );
        earthRoot.add(land);

        const atmosphere = new THREE.Mesh(
          new THREE.SphereGeometry(1.66, 48, 40),
          new THREE.ShaderMaterial({
            uniforms: { glowColor: { value: new THREE.Color(0x63d8dc) } },
            vertexShader: `
              varying vec3 vNormal;
              varying vec3 vViewDirection;
              void main() {
                vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
                vNormal = normalize(normalMatrix * normal);
                vViewDirection = normalize(-modelViewPosition.xyz);
                gl_Position = projectionMatrix * modelViewPosition;
              }
            `,
            fragmentShader: `
              uniform vec3 glowColor;
              varying vec3 vNormal;
              varying vec3 vViewDirection;
              void main() {
                float fresnel = pow(1.0 - max(dot(vNormal, vViewDirection), 0.0), 2.35);
                gl_FragColor = vec4(glowColor, fresnel * 0.48);
              }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.FrontSide,
          }),
        );
        earthRoot.add(atmosphere);

        const karachiNormal = toVector(KARACHI.latitude, KARACHI.longitude, 1).normalize();
        const karachiPosition = karachiNormal.clone().multiplyScalar(1.585);
        const markerRoot = new THREE.Group();
        markerRoot.position.copy(karachiPosition);
        markerRoot.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), karachiNormal);
        earthRoot.add(markerRoot);

        const marker = new THREE.Mesh(
          new THREE.SphereGeometry(0.052, 18, 18),
          new THREE.MeshBasicMaterial({ color: 0xff745c, toneMapped: false }),
        );
        markerRoot.add(marker);

        const pulseMaterial = new THREE.MeshBasicMaterial({
          color: 0xff8068,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          toneMapped: false,
        });
        const pulse = new THREE.Mesh(new THREE.RingGeometry(0.075, 0.096, 40), pulseMaterial);
        pulse.position.z = 0.004;
        markerRoot.add(pulse);

        const outerPulseMaterial = pulseMaterial.clone();
        outerPulseMaterial.opacity = 0.32;
        const outerPulse = new THREE.Mesh(new THREE.RingGeometry(0.13, 0.142, 48), outerPulseMaterial);
        outerPulse.position.z = 0.002;
        markerRoot.add(outerPulse);

        const beaconGeometry = new THREE.BufferGeometry().setFromPoints([
          karachiNormal.clone().multiplyScalar(1.6),
          karachiNormal.clone().multiplyScalar(1.94),
        ]);
        const beacon = new THREE.Line(
          beaconGeometry,
          new THREE.LineBasicMaterial({
            color: 0xff8068,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        earthRoot.add(beacon);

        const routeCurves: Array<{
          curve: InstanceType<typeof THREE.CatmullRomCurve3>;
          packet: InstanceType<typeof THREE.Mesh>;
          line: InstanceType<typeof THREE.Line>;
          speed: number;
          offset: number;
        }> = [];
        const destination = karachiNormal.clone();
        const packetGeometry = new THREE.SphereGeometry(0.023, 10, 10);
        ROUTE_ORIGINS.forEach((route, routeIndex) => {
          const [longitude, latitude] = route.coordinates;
          const origin = toVector(latitude, longitude, 1).normalize();
          const angle = Math.acos(THREE.MathUtils.clamp(origin.dot(destination), -1, 1));
          const angleSin = Math.sin(angle);
          const points: InstanceType<typeof THREE.Vector3>[] = [];
          for (let pointIndex = 0; pointIndex <= 56; pointIndex += 1) {
            const progress = pointIndex / 56;
            const direction = angleSin < 0.0001
              ? origin.clone().lerp(destination, progress).normalize()
              : origin.clone().multiplyScalar(Math.sin((1 - progress) * angle) / angleSin)
                .add(destination.clone().multiplyScalar(Math.sin(progress * angle) / angleSin))
                .normalize();
            const lift = Math.sin(Math.PI * progress) * (0.16 + angle * 0.13);
            points.push(direction.multiplyScalar(1.59 + lift));
          }
          const curve = new THREE.CatmullRomCurve3(points);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: route.color,
            transparent: true,
            opacity: routeIndex % 2 === 0 ? 0.55 : 0.4,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(90)), lineMaterial);
          earthRoot.add(line);

          const packet = new THREE.Mesh(
            packetGeometry,
            new THREE.MeshBasicMaterial({
              color: route.color,
              toneMapped: false,
              transparent: true,
              opacity: 0.95,
            }),
          );
          packet.position.copy(curve.getPoint((routeIndex * 0.17) % 1));
          earthRoot.add(packet);
          routeCurves.push({ curve, packet, line, speed: route.speed, offset: routeIndex * 0.17 });
        });

        const originGeometry = new THREE.BufferGeometry();
        originGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(
            ROUTE_ORIGINS.flatMap((route) => {
              const [longitude, latitude] = route.coordinates;
              const point = toVector(latitude, longitude, 1.585);
              return [point.x, point.y, point.z];
            }),
            3,
          ),
        );
        earthRoot.add(new THREE.Points(
          originGeometry,
          new THREE.PointsMaterial({
            color: 0xffd3b1,
            size: 0.038,
            transparent: true,
            opacity: 0.92,
            depthWrite: false,
          }),
        ));

        const orbitRoot = new THREE.Group();
        const orbitMaterial = new THREE.MeshBasicMaterial({
          color: 0x72d4d3,
          transparent: true,
          opacity: 0.14,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const orbitOne = new THREE.Mesh(new THREE.TorusGeometry(1.98, 0.006, 6, 160), orbitMaterial);
        orbitOne.rotation.set(1.02, 0.18, 0.28);
        orbitRoot.add(orbitOne);
        const orbitTwo = new THREE.Mesh(new THREE.TorusGeometry(2.14, 0.004, 6, 160), orbitMaterial.clone());
        orbitTwo.rotation.set(0.45, -0.75, -0.3);
        orbitRoot.add(orbitTwo);
        worldRoot.add(orbitRoot);

        const focusDirection = new THREE.Vector3(0.13, 0.08, 1).normalize();
        earthRoot.quaternion.setFromUnitVectors(karachiNormal, focusDirection);

        const starPositions: number[] = [];
        for (let starIndex = 0; starIndex < 260; starIndex += 1) {
          const x = (seededRandom(starIndex * 3 + 11) - 0.5) * 13;
          const y = (seededRandom(starIndex * 3 + 12) - 0.5) * 9;
          const z = -1.5 - seededRandom(starIndex * 3 + 13) * 6;
          starPositions.push(x, y, z);
        }
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
        const stars = new THREE.Points(
          starGeometry,
          new THREE.PointsMaterial({
            color: 0xdffbfa,
            size: 0.022,
            transparent: true,
            opacity: 0.58,
            depthWrite: false,
          }),
        );
        scene.add(stars);

        scene.add(new THREE.HemisphereLight(0xffe5bc, 0x041920, 2.3));
        const key = new THREE.DirectionalLight(0xffd6a4, 3.4);
        key.position.set(-3, 4.5, 5);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0x54ced2, 2.6);
        rim.position.set(4, -1, -2);
        scene.add(rim);

        let frame = 0;
        let isVisible = true;
        let elapsed = reducedMotion ? 4.2 : 0;
        let hoverTargetX = 0;
        let hoverTargetY = 0;
        let rotationX = 0;
        let rotationY = 0;
        let dragYaw = 0;
        let dragPitch = 0;
        let focusStrength = reducedMotion ? 0.35 : 0;
        let focusTarget = reducedMotion ? 0.35 : 0;
        let pointerDown = false;
        let pointerId = -1;
        let pointerType = "";
        let pointerStartX = 0;
        let pointerStartY = 0;
        let pointerLastX = 0;
        let pointerLastY = 0;
        let pointerTravel = 0;
        let pointerStartedAt = 0;
        const clock = new THREE.Clock();
        const labelWorldPosition = new THREE.Vector3();

        const updateLabel = () => {
          const label = labelRef.current;
          if (!label) return;
          marker.getWorldPosition(labelWorldPosition);
          const facing = labelWorldPosition.clone().normalize().dot(camera.position.clone().normalize());
          const projected = labelWorldPosition.clone().project(camera);
          const x = (projected.x * 0.5 + 0.5) * mount.clientWidth;
          const y = (-projected.y * 0.5 + 0.5) * mount.clientHeight;
          label.style.left = `${x}px`;
          label.style.top = `${y}px`;
          label.style.opacity = facing > 0.14 ? "1" : "0";
        };

        const renderFrame = () => {
          frame = 0;
          const delta = Math.min(clock.getDelta(), 0.05);
          if (!reducedMotion) elapsed += delta;

          if (!reducedMotion) {
            rotationX += (hoverTargetY * 0.12 + dragPitch - rotationX) * Math.min(1, delta * 4.8);
            rotationY += (hoverTargetX * 0.17 + dragYaw - rotationY) * Math.min(1, delta * 4.8);
            focusStrength += (focusTarget - focusStrength) * Math.min(1, delta * 4.2);
            dragYaw *= Math.pow(0.992, delta * 60);
            dragPitch *= Math.pow(0.992, delta * 60);
            worldRoot.rotation.x = rotationX + Math.sin(elapsed * 0.31) * 0.012;
            worldRoot.rotation.y = rotationY + Math.sin(elapsed * 0.22) * 0.028;
            orbitRoot.rotation.z = elapsed * 0.025;
            stars.rotation.z = elapsed * 0.002;
            const pulseWave = (Math.sin(elapsed * 2.35) + 1) * 0.5;
            pulse.scale.setScalar(1 + pulseWave * (0.38 + focusStrength * 0.2));
            pulseMaterial.opacity = 0.72 - pulseWave * 0.42 + focusStrength * 0.18;
            outerPulse.scale.setScalar(1 + pulseWave * 0.56);
            outerPulseMaterial.opacity = 0.31 - pulseWave * 0.18 + focusStrength * 0.1;
            routeCurves.forEach((route) => {
              route.packet.position.copy(route.curve.getPoint((elapsed * route.speed + route.offset) % 1));
              (route.line.material as InstanceType<typeof THREE.LineBasicMaterial>).opacity = 0.4 + focusStrength * 0.25;
            });
            camera.position.z += ((5.72 - focusStrength * 0.66) - camera.position.z) * Math.min(1, delta * 3.7);
          } else {
            worldRoot.rotation.set(-0.018, 0.025, 0);
            orbitRoot.rotation.z = 0.12;
            pulse.scale.setScalar(1.18);
            outerPulse.scale.setScalar(1.3);
          }

          worldRoot.updateMatrixWorld(true);
          updateLabel();
          renderer.render(scene, camera);
          if (!reducedMotion && isVisible) frame = requestAnimationFrame(renderFrame);
        };

        const requestRender = () => {
          if (reducedMotion) renderFrame();
          else if (isVisible && !frame) frame = requestAnimationFrame(renderFrame);
        };

        const activateFocus = () => {
          if (reducedMotion) return;
          focusTarget = focusTarget > 0.55 ? 0 : 1;
          hoverTargetX = 0;
          hoverTargetY = 0;
          dragYaw *= 0.25;
          dragPitch *= 0.25;
          requestRender();
        };

        const onPointerDown = (event: PointerEvent) => {
          if (reducedMotion) return;
          pointerDown = true;
          pointerId = event.pointerId;
          pointerType = event.pointerType;
          pointerStartX = event.clientX;
          pointerStartY = event.clientY;
          pointerLastX = event.clientX;
          pointerLastY = event.clientY;
          pointerTravel = 0;
          pointerStartedAt = performance.now();
          if (pointerType !== "touch") {
            renderer.domElement.setPointerCapture(event.pointerId);
            renderer.domElement.style.cursor = "grabbing";
          }
        };

        const onPointerMove = (event: PointerEvent) => {
          if (reducedMotion) return;
          const bounds = renderer.domElement.getBoundingClientRect();
          if (!pointerDown) {
            if (event.pointerType === "touch") return;
            hoverTargetX = THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 2, -1, 1);
            hoverTargetY = THREE.MathUtils.clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 2, -1, 1);
            requestRender();
            return;
          }
          if (event.pointerId !== pointerId || pointerType === "touch") return;
          const deltaX = event.clientX - pointerLastX;
          const deltaY = event.clientY - pointerLastY;
          pointerTravel += Math.abs(deltaX) + Math.abs(deltaY);
          dragYaw = THREE.MathUtils.clamp(dragYaw + deltaX * 0.0042, -0.48, 0.48);
          dragPitch = THREE.MathUtils.clamp(dragPitch + deltaY * 0.0032, -0.24, 0.24);
          pointerLastX = event.clientX;
          pointerLastY = event.clientY;
          requestRender();
        };

        const finishPointer = (event: PointerEvent) => {
          if (!pointerDown || event.pointerId !== pointerId) return;
          const distance = Math.hypot(event.clientX - pointerStartX, event.clientY - pointerStartY);
          const wasTap = distance < 9 && pointerTravel < 14 && performance.now() - pointerStartedAt < 450;
          if (pointerType !== "touch" && renderer.domElement.hasPointerCapture(event.pointerId)) {
            renderer.domElement.releasePointerCapture(event.pointerId);
          }
          pointerDown = false;
          pointerId = -1;
          renderer.domElement.style.cursor = "grab";
          if (wasTap) activateFocus();
        };

        const cancelPointer = (event: PointerEvent) => {
          if (!pointerDown || event.pointerId !== pointerId) return;
          pointerDown = false;
          pointerId = -1;
          renderer.domElement.style.cursor = "grab";
        };

        const onPointerLeave = () => {
          if (pointerDown) return;
          hoverTargetX = 0;
          hoverTargetY = 0;
        };

        renderer.domElement.addEventListener("pointerdown", onPointerDown);
        renderer.domElement.addEventListener("pointermove", onPointerMove);
        renderer.domElement.addEventListener("pointerup", finishPointer);
        renderer.domElement.addEventListener("pointercancel", cancelPointer);
        renderer.domElement.addEventListener("pointerleave", onPointerLeave);

        const visibilityObserver = new IntersectionObserver(([entry]) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (!isVisible) {
            cancelAnimationFrame(frame);
            frame = 0;
            clock.stop();
          } else if (!wasVisible) {
            clock.start();
            requestRender();
          }
        });
        visibilityObserver.observe(mount);

        const resize = () => {
          const width = Math.max(1, mount.clientWidth);
          const height = Math.max(1, mount.clientHeight);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          renderer.setSize(width, height);
          worldRoot.updateMatrixWorld(true);
          updateLabel();
          renderer.render(scene, camera);
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);

        renderFrame();

        cleanup = () => {
          cancelAnimationFrame(frame);
          visibilityObserver.disconnect();
          resizeObserver.disconnect();
          renderer.domElement.removeEventListener("pointerdown", onPointerDown);
          renderer.domElement.removeEventListener("pointermove", onPointerMove);
          renderer.domElement.removeEventListener("pointerup", finishPointer);
          renderer.domElement.removeEventListener("pointercancel", cancelPointer);
          renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
          const geometries = new Set<InstanceType<typeof THREE.BufferGeometry>>();
          const materials = new Set<InstanceType<typeof THREE.Material>>();
          scene.traverse((object) => {
            const drawable = object as typeof object & {
              geometry?: InstanceType<typeof THREE.BufferGeometry>;
              material?: InstanceType<typeof THREE.Material> | InstanceType<typeof THREE.Material>[];
            };
            if (drawable.geometry) geometries.add(drawable.geometry);
            if (Array.isArray(drawable.material)) drawable.material.forEach((material) => materials.add(material));
            else if (drawable.material) materials.add(drawable.material);
          });
          geometries.forEach((geometry) => geometry.dispose());
          materials.forEach((material) => material.dispose());
          if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
          renderer.renderLists.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
        };
      })
      .catch(() => {
        if (!disposed) mount.dataset.webgl = "unavailable";
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={mountRef}
      className="intro-world"
      aria-hidden="true"
      style={{ touchAction: "pan-y", userSelect: "none" }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 0,
          inset: "12%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(80, 196, 201, .2) 0%, rgba(20, 85, 102, .1) 45%, transparent 72%)",
          boxShadow: "0 0 100px rgba(91, 195, 198, .09)",
          pointerEvents: "none",
        }}
      />
      <div
        ref={labelRef}
        style={{
          position: "absolute",
          zIndex: 3,
          left: "54%",
          top: "43%",
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          padding: ".48rem .65rem",
          color: "#fff7e8",
          background: "rgba(7, 28, 36, .78)",
          border: "1px solid rgba(255, 247, 232, .22)",
          borderRadius: "999px",
          boxShadow: "0 10px 35px rgba(0, 0, 0, .24)",
          backdropFilter: "blur(8px)",
          transform: "translate(-50%, calc(-100% - 12px))",
          transition: "opacity .25s ease",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-geist-mono), monospace",
        }}
      >
        <span
          style={{
            width: ".45rem",
            height: ".45rem",
            flex: "0 0 auto",
            borderRadius: "50%",
            background: "#f06f55",
            boxShadow: "0 0 14px rgba(240, 111, 85, .9)",
          }}
        />
        <strong style={{ fontSize: ".62rem", letterSpacing: ".14em" }}>KARACHI</strong>
        <span style={{ color: "rgba(255, 247, 232, .6)", fontSize: ".48rem", letterSpacing: ".06em" }}>
          24.86°N · 67.00°E
        </span>
      </div>
    </div>
  );
}
