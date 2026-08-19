"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { SectionTheme } from "@/lib/site";
import { themeColors } from "./types";

/**
 * Vivid animated "living scene" inside a portal arch.
 * A themed flowing-energy shader that pulses, swirls, and breathes  - 
 * making the portal feel like a doorway to another world.
 */
export default function PortalScene({ theme }: { theme: SectionTheme }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { base, glow } = themeColors[theme];

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });

    const uniforms = {
      uTime: { value: 0 },
      uBase: { value: new THREE.Color(base) },
      uGlow: { value: new THREE.Color(glow) },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        precision mediump float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uBase;
        uniform vec3 uGlow;

        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
        float noise(vec2 p){
          vec2 i = floor(p); vec2 f = fract(p);
          float a = hash(i); float b = hash(i+vec2(1,0));
          float c = hash(i+vec2(0,1)); float d = hash(i+vec2(1,1));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
        }
        float fbm(vec2 p){
          float v = 0.0; float a = 0.5;
          for(int i=0; i<4; i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
          return v;
        }

        void main() {
          vec2 uv = vUv;
          vec2 center = uv - 0.5;
          float dist = length(center);
          float angle = atan(center.y, center.x);
          float t = uTime * 0.5;
          
          // Swirling energy vortex
          float spiral = fbm(vec2(
            cos(angle + t) * dist * 4.0,
            sin(angle - t * 0.7) * dist * 4.0 + t
          ));
          
          // Flowing streams from top
          float stream = fbm(vec2(uv.x * 5.0 + sin(t * 0.3), uv.y * 3.0 - t * 1.5));
          
          // Radial pulse from center
          float pulse = sin(dist * 8.0 - t * 3.0) * 0.5 + 0.5;
          pulse *= smoothstep(0.6, 0.0, dist);
          
          // Combine
          float energy = spiral * 0.5 + stream * 0.3 + pulse * 0.2;
          
          // Color mixing  -  vibrant between base and glow
          vec3 col = mix(uBase, uGlow, smoothstep(0.2, 0.8, energy));
          col += vec3(pulse * 0.15); // Bright pulse at center
          
          // Strong circular vignette (looks like looking into a tunnel/portal)
          float vignette = smoothstep(0.7, 0.15, dist);
          
          // Edge ring glow
          float ring = smoothstep(0.02, 0.0, abs(dist - 0.45 - sin(t * 2.0) * 0.03));
          col += uGlow * ring * 0.5;
          
          float alpha = vignette * (0.6 + energy * 0.3);
          
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    let raf = 0;
    const clock = new THREE.Clock();
    const render = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };

    if (reduce) {
      uniforms.uTime.value = 1.5; // nice frozen frame
      renderer.render(scene, camera);
    } else {
      render();
    }

    const onResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      material.dispose();
      quad.geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [theme]);

  return <div ref={containerRef} aria-hidden className="absolute inset-0" />;
}
