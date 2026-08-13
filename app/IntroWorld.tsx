"use client";

import { useEffect, useRef } from "react";

type IntroWorldProps = {
  reducedMotion: boolean;
};

export default function IntroWorld({ reducedMotion }: IntroWorldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

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
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
        } catch {
          mount.dataset.webgl = "unavailable";
          return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
        renderer.setSize(Math.max(1, mount.clientWidth), Math.max(1, mount.clientHeight));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, Math.max(1, mount.clientWidth) / Math.max(1, mount.clientHeight), 0.1, 100);
        camera.position.set(0, 0.2, 5.8);

        const group = new THREE.Group();
        scene.add(group);

        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(1.55, 48, 48),
          new THREE.MeshStandardMaterial({ color: 0x0b5260, roughness: 0.72, metalness: 0.05 }),
        );
        group.add(sphere);

        const wire = new THREE.LineSegments(
          new THREE.WireframeGeometry(new THREE.SphereGeometry(1.565, 20, 14)),
          new THREE.LineBasicMaterial({ color: 0x78abb0, transparent: true, opacity: 0.22 }),
        );
        group.add(wire);

        const atmosphere = new THREE.Mesh(
          new THREE.SphereGeometry(1.68, 40, 40),
          new THREE.MeshBasicMaterial({ color: 0x5ec7cc, transparent: true, opacity: 0.055, side: THREE.BackSide }),
        );
        group.add(atmosphere);

        const karachiDot = new THREE.Mesh(
          new THREE.SphereGeometry(0.048, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0xf06f55 }),
        );
        karachiDot.position.set(0.46, -0.18, 1.49);
        group.add(karachiDot);

        const pulse = new THREE.Mesh(
          new THREE.RingGeometry(0.065, 0.085, 28),
          new THREE.MeshBasicMaterial({ color: 0xf06f55, transparent: true, opacity: 0.72, side: THREE.DoubleSide }),
        );
        pulse.position.copy(karachiDot.position);
        pulse.lookAt(camera.position);
        group.add(pulse);

        scene.add(new THREE.HemisphereLight(0xffefd0, 0x052029, 2.2));
        const key = new THREE.DirectionalLight(0xffd39d, 3.2);
        key.position.set(-3, 4, 4);
        scene.add(key);

        let frame = 0;
        let isVisible = true;
        let elapsed = 0;
        const clock = new THREE.Clock();
        const render = () => {
          frame = 0;
          elapsed += clock.getDelta();
          if (!reducedMotion) {
            group.rotation.y = -0.32 + elapsed * 0.045;
            pulse.scale.setScalar(1 + Math.sin(elapsed * 2) * 0.2);
            pulse.material.opacity = 0.55 + Math.sin(elapsed * 2) * 0.18;
          } else {
            group.rotation.y = -0.32;
          }
          renderer.render(scene, camera);
          if (!reducedMotion && isVisible) frame = requestAnimationFrame(render);
        };
        render();

        const visibilityObserver = new IntersectionObserver(([entry]) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (!isVisible) {
            cancelAnimationFrame(frame);
            frame = 0;
          } else if (!wasVisible && !reducedMotion && !frame) {
            clock.getDelta();
            frame = requestAnimationFrame(render);
          }
        });
        visibilityObserver.observe(mount);

        const resize = () => {
          const width = Math.max(1, mount.clientWidth);
          const height = Math.max(1, mount.clientHeight);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          renderer.render(scene, camera);
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);

        cleanup = () => {
          cancelAnimationFrame(frame);
          visibilityObserver.disconnect();
          resizeObserver.disconnect();
          if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
          sphere.geometry.dispose();
          sphere.material.dispose();
          wire.geometry.dispose();
          wire.material.dispose();
          atmosphere.geometry.dispose();
          atmosphere.material.dispose();
          karachiDot.geometry.dispose();
          karachiDot.material.dispose();
          pulse.geometry.dispose();
          pulse.material.dispose();
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

  return <div ref={mountRef} className="intro-world" aria-hidden="true" />;
}
