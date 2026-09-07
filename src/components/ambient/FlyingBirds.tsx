"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 3D Kingfisher (GLB model) that:
 * 1. Flies in from one side (2.5s)
 * 2. Perches/hovers at a random spot (5s)  -  gentle bob, head turning
 * 3. Flies away to the other side (2.5s)
 * 
 * Uses Three.js + GLTFLoader loaded LAZILY after page is idle.
 * Only runs in production or after page is stable (5s delay).
 * Repeats every 50 seconds.
 */
export function FlyingBirds() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Delay initialization to avoid interfering with page load
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const container = canvasRef.current;
    if (!container) return;

    let disposed = false;

    // Lazy import Three.js to avoid blocking initial render
    Promise.all([
      import("three"),
      import("three/addons/loaders/GLTFLoader.js"),
    ]).then(([THREE, { GLTFLoader }]) => {
      if (disposed) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 768;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
      // Mobile: pull camera back more to fit bird in smaller viewport
      camera.position.set(0, 0, isMobile ? 15 : 10);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 1.5));
      const sun = new THREE.DirectionalLight(0xffe4b5, 2);
      sun.position.set(5, 10, 5);
      scene.add(sun);

      // Load bird
      const loader = new GLTFLoader();
      let bird: any = null;
      let mixer: any = null;

      loader.load("/models/kingfisher.glb", (gltf) => {
        if (disposed) return;
        bird = gltf.scene;
        // Mobile: smaller scale to fit viewport
        bird.scale.setScalar(isMobile ? 0.25 : 0.35);
        bird.visible = false;
        scene.add(bird);

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(bird);
          mixer.clipAction(gltf.animations[0]).play();
        }
      });

      // State machine
      type State = "idle" | "fly-in" | "perch" | "fly-out";
      let state: State = "idle";
      let stateTime = 0;
      let perchPos = { x: 0, y: 2 };
      let flyDir = 1;
      let idleTime = 0;

      const FLY_DUR = 2.5;
      const PERCH_DUR = 5;
      const INTERVAL = 50;

      const clock = new THREE.Clock();
      let raf = 0;

      const animate = () => {
        if (disposed) return;
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);

        if (state === "idle") {
          idleTime += delta;
          if (idleTime >= INTERVAL && bird) {
            state = "fly-in";
            stateTime = 0;
            idleTime = 0;
            flyDir = Math.random() > 0.5 ? 1 : -1;
            // Mobile: narrower perch range to fit screen
            const xRange = isMobile ? 4 : 6;
            const yRange = isMobile ? 2 : 3;
            perchPos = {
              x: -(xRange/2) + Math.random() * xRange,
              y: 1 + Math.random() * yRange
            };
            bird.visible = true;
            bird.rotation.y = flyDir > 0 ? Math.PI * 0.5 : -Math.PI * 0.5;
          }
        }

        if (bird && state !== "idle") {
          stateTime += delta;

          if (state === "fly-in") {
            const p = Math.min(stateTime / FLY_DUR, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            // Mobile: shorter entry distance
            const entryDist = isMobile ? 10 : 14;
            const sx = flyDir > 0 ? -entryDist : entryDist;
            bird.position.x = sx + (perchPos.x - sx) * ease;
            bird.position.y = 5 + (perchPos.y - 5) * ease;
            bird.position.z = -2 + ease * 2;
            bird.rotation.z = (1 - ease) * 0.3 * flyDir;
            if (p >= 1) { state = "perch"; stateTime = 0; bird.rotation.z = 0; bird.rotation.y = 0; }
          }

          if (state === "perch") {
            bird.position.y = perchPos.y + Math.sin(stateTime * 2) * 0.05;
            bird.rotation.y = Math.sin(stateTime * 0.5) * 0.2;
            if (stateTime >= PERCH_DUR) {
              state = "fly-out";
              stateTime = 0;
              bird.rotation.y = flyDir > 0 ? -Math.PI * 0.5 : Math.PI * 0.5;
            }
          }

          if (state === "fly-out") {
            const p = Math.min(stateTime / FLY_DUR, 1);
            const ease = p * p;
            // Mobile: shorter exit distance
            const exitDist = isMobile ? 10 : 14;
            const ex = flyDir > 0 ? -exitDist : exitDist;
            bird.position.x = perchPos.x + (ex - perchPos.x) * ease;
            bird.position.y = perchPos.y + (6 - perchPos.y) * ease;
            bird.rotation.z = ease * -0.3 * flyDir;
            if (p >= 1) { state = "idle"; bird.visible = false; }
          }
        }

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };

      raf = requestAnimationFrame(animate);

      const onResize = () => {
        const nw = window.innerWidth;
        const nh = window.innerHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);

        // Update mobile detection on resize
        const nowMobile = nw < 768;
        if (nowMobile !== isMobile) {
          // Viewport changed between mobile/desktop - reload to apply correct scale
          window.location.reload();
        }
      };
      window.addEventListener("resize", onResize);

      // Cleanup function stored for disposal
      (container as any).__cleanup = () => {
        disposed = true;
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      if ((container as any).__cleanup) (container as any).__cleanup();
    };
  }, [ready]);

  return (
    <div
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[55]"
      aria-hidden
    />
  );
}
