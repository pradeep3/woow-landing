"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { createNoise2D } from "simplex-noise";

import {
  signalFieldFragmentShader,
  signalFieldVertexShader,
} from "@/components/hero/signal-field-shader";
import { hero } from "@/content/home";

export type FieldPalette = {
  theme: "light" | "dark";
  bg: string;
  base: string;
  accent: string;
};

/**
 * Geometry, noise, and motion are identical across themes — only colour gain
 * and bloom tuning differ. Light mode is the one that goes wrong easily: the
 * page background sits at a luminance of roughly 0.95, so the bloom threshold
 * has to clear it, and the near-black base dots must stay matte. Gold carries
 * all of the glow.
 */
const THEME_TUNING = {
  light: {
    baseGain: 1.0,
    accentGain: 2.7,
    minAlpha: 0.32,
    sideDim: 0.45,
    bloom: {
      intensity: 0.62,
      luminanceThreshold: 1.0,
      luminanceSmoothing: 0.1,
      radius: 0.46,
    },
  },
  dark: {
    baseGain: 0.92,
    accentGain: 2.5,
    minAlpha: 0.26,
    sideDim: 0.5,
    bloom: {
      intensity: 1.15,
      luminanceThreshold: 0.6,
      luminanceSmoothing: 0.38,
      radius: 0.74,
    },
  },
} as const;

type Quality = {
  cols: number;
  rows: number;
  spacing: number;
  dotSize: number;
};

const QUALITY: Record<"high" | "low", Quality> = {
  // ~3,840 instances on desktop, ~1,150 on low-power devices.
  high: { cols: 80, rows: 48, spacing: 0.4, dotSize: 0.045 },
  low: { cols: 46, rows: 25, spacing: 0.7, dotSize: 0.075 },
};

/** The field is pushed back from the camera so the front row is not looming. */
const FIELD_OFFSET_Z = -3;

/** Focal source, in field XZ. Sits under the headline's negative space. */
const FOCAL: [number, number] = [4.6, -2.6];

/** Frozen timestamp used for reduced motion — mid-pulse, focal cluster lit. */
const FROZEN_TIME = 6.25;

const PULSE_SPEED = (Math.PI * 2) / 5; // ~5s radial pulse period

/** 3D anchors for the floating labels, ordered to match content/home.ts. */
const LABEL_ANCHORS: [number, number, number][] = [
  [4.2, 2.4, -0.6],
  [8.6, 1.5, -4.2],
  [2.6, 1.0, -8.0],
  [7.4, 0.6, 1.6],
];

const CAMERA_HOME: [number, number, number] = [0, 2.5, 12];
const CAMERA_TARGET: [number, number, number] = [1.5, 0.4, -2];

/** Small deterministic PRNG so the scatter is identical on every load. */
function makeRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/**
 * Colour uniforms start neutral and are filled in by the palette effect on the
 * first commit, so the material never has to be rebuilt when the theme flips.
 */
function createUniforms(dotSize: number, frozen: boolean) {
  return {
    uTime: { value: frozen ? FROZEN_TIME : 0 },
    uFocal: { value: new THREE.Vector2(FOCAL[0], FOCAL[1]) },
    uHover: { value: new THREE.Vector2(FOCAL[0], FOCAL[1]) },
    uHoverStrength: { value: 0 },
    uAmplitude: { value: 1.15 },
    uFrequency: { value: 0.135 },
    uRadius: { value: 7 },
    uPulseSpeed: { value: PULSE_SPEED },
    uDotSize: { value: dotSize },
    uBaseColor: { value: new THREE.Color("#111111") },
    uAccentColor: { value: new THREE.Color("#d9b84c") },
    uBaseGain: { value: 1 },
    uAccentGain: { value: 2.7 },
    uNear: { value: 9 },
    uFar: { value: 34 },
    uMinAlpha: { value: 0.32 },
    uSideDim: { value: 0.45 },
    uFade: { value: frozen ? 1 : 0 },
  };
}

/** Reads the live uniforms back off the mesh, outside of render. */
function uniformsOf(mesh: THREE.InstancedMesh | null) {
  if (!mesh) return null;
  return (mesh.material as THREE.ShaderMaterial).uniforms;
}

function SignalField({
  palette,
  quality,
  frozen,
  hoverAnchor,
}: {
  palette: FieldPalette;
  quality: Quality;
  frozen: boolean;
  hoverAnchor: number | null;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const invalidate = useThree((state) => state.invalidate);
  const count = quality.cols * quality.rows;

  const { geometry, material } = useMemo(() => {
    return {
      geometry: new THREE.PlaneGeometry(1, 1),
      material: new THREE.ShaderMaterial({
        vertexShader: signalFieldVertexShader,
        fragmentShader: signalFieldFragmentShader,
        uniforms: createUniforms(quality.dotSize, frozen),
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    };
  }, [quality.dotSize, frozen]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // Theme changes are pushed onto the live uniforms rather than rebuilding the
  // material — which is what keeps both themes a single component with one set
  // of geometry, noise, and motion.
  useEffect(() => {
    const uniforms = uniformsOf(meshRef.current);
    if (!uniforms) return;

    const tuning = THEME_TUNING[palette.theme];
    uniforms.uBaseColor.value.set(palette.base);
    uniforms.uAccentColor.value.set(palette.accent);
    uniforms.uBaseGain.value = tuning.baseGain;
    uniforms.uAccentGain.value = tuning.accentGain;
    uniforms.uMinAlpha.value = tuning.minAlpha;
    uniforms.uSideDim.value = tuning.sideDim;
    invalidate();
  }, [palette, invalidate]);

  // Base positions: a grid, pushed off-lattice by simplex noise so the field
  // scatters organically instead of reading as graph paper.
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const noise2D = createNoise2D(makeRandom(20240917));
    const matrix = new THREE.Matrix4();
    const { cols, rows, spacing } = quality;
    const offsetX = ((cols - 1) * spacing) / 2;
    const offsetZ = ((rows - 1) * spacing) / 2;

    let index = 0;
    for (let column = 0; column < cols; column += 1) {
      for (let row = 0; row < rows; row += 1) {
        const gridX = column * spacing - offsetX;
        const gridZ = row * spacing - offsetZ;

        const jitterX = noise2D(gridX * 0.9, gridZ * 0.9) * spacing * 0.42;
        const jitterZ =
          noise2D(gridX * 0.9 + 91.7, gridZ * 0.9 - 33.1) * spacing * 0.42;
        // Size variance keyed to a slower noise field, so neighbouring dots
        // vary together in soft patches rather than at random.
        const size = 0.76 + (noise2D(gridX * 0.22, gridZ * 0.22) * 0.5 + 0.5) * 0.44;

        matrix.makeScale(size, size, size);
        matrix.setPosition(
          gridX + jitterX,
          0,
          gridZ + jitterZ + FIELD_OFFSET_Z,
        );
        mesh.setMatrixAt(index, matrix);
        index += 1;
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
  }, [quality]);

  useFrame((_, delta) => {
    if (frozen) return;

    const uniforms = uniformsOf(meshRef.current);
    if (!uniforms) return;

    const clamped = Math.min(delta, 0.05);

    uniforms.uTime.value += clamped;
    // Entrance: the field resolves in rather than popping on.
    uniforms.uFade.value = Math.min(1, uniforms.uFade.value + clamped * 0.9);

    const target = hoverAnchor === null ? 0 : 1;
    uniforms.uHoverStrength.value +=
      (target - uniforms.uHoverStrength.value) * Math.min(1, clamped * 6);

    if (hoverAnchor !== null) {
      const anchor = LABEL_ANCHORS[hoverAnchor];
      uniforms.uHover.value.set(anchor[0], anchor[2]);
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      // Remount when the instance budget changes so the buffer is resized.
      key={count}
    />
  );
}

function CameraRig({ parallax }: { parallax: boolean }) {
  const pointerRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef(new THREE.Vector3(...CAMERA_TARGET));

  const { camera, invalidate } = useThree();

  useLayoutEffect(() => {
    camera.position.set(...CAMERA_HOME);
    camera.lookAt(targetRef.current);
    invalidate();
  }, [camera, invalidate]);

  useEffect(() => {
    if (!parallax) return;

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [parallax]);

  useFrame((state, delta) => {
    if (!parallax) return;

    // Small offset only. This should read as depth, not as an orbit control.
    const pointer = pointerRef.current;
    const desiredX = CAMERA_HOME[0] + pointer.x * 1.1;
    const desiredY = CAMERA_HOME[1] - pointer.y * 0.55;
    const ease = Math.min(1, delta * 2.4);

    state.camera.position.x += (desiredX - state.camera.position.x) * ease;
    state.camera.position.y += (desiredY - state.camera.position.y) * ease;
    state.camera.lookAt(targetRef.current);
  });

  return null;
}

function FloatingLabel({
  index,
  reducedMotion,
  onHover,
}: {
  index: number;
  reducedMotion: boolean;
  onHover: (index: number | null) => void;
}) {
  const label = hero.labels[index];
  const riseRef = useRef<HTMLSpanElement>(null);

  // The rise-in lives on the outer span and the idle bob on the inner link, so
  // the two never fight over the same transform.
  useEffect(() => {
    const node = riseRef.current;
    if (!node) return;

    if (reducedMotion) {
      node.style.opacity = "1";
      return;
    }

    const animation = node.animate(
      [
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 620,
        delay: 420 + index * 150,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      },
    );

    return () => animation.cancel();
  }, [index, reducedMotion]);

  return (
    <group position={LABEL_ANCHORS[index]}>
      <Html center zIndexRange={[12, 0]} style={{ pointerEvents: "none" }}>
        <span ref={riseRef} className="inline-block" style={{ opacity: 0 }}>
          <Link
            href={label.href}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(index)}
            onBlur={() => onHover(null)}
            style={{ animationDelay: `${index * 0.9}s` }}
            className="label-bob pointer-events-auto inline-flex items-center gap-2 border border-accent-line bg-[var(--overlay)] px-3 py-1.5 font-mono text-2xs tracking-[0.18em] whitespace-nowrap text-accent uppercase backdrop-blur-sm transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-[#111111]"
          >
            <span
              aria-hidden="true"
              className="size-[4px] rounded-full bg-current"
            />
            {label.text}
          </Link>
        </span>
      </Html>
    </group>
  );
}

export default function SignalFieldScene({
  palette,
  tier,
  reducedMotion,
  showLabels,
}: {
  palette: FieldPalette;
  tier: "high" | "low";
  reducedMotion: boolean;
  showLabels: boolean;
}) {
  const quality = QUALITY[tier];
  const [hoverAnchor, setHoverAnchor] = useState<number | null>(null);
  const bloom = THEME_TUNING[palette.theme].bloom;

  return (
    <Canvas
      // Reduced motion renders a single representative frame and then stops.
      frameloop={reducedMotion ? "demand" : "always"}
      dpr={tier === "high" ? [1, 2] : [1, 1.5]}
      camera={{ fov: 42, near: 0.1, far: 120, position: CAMERA_HOME }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        toneMapping: THREE.NoToneMapping,
      }}
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={[palette.bg]} />
      <CameraRig parallax={!reducedMotion && tier === "high"} />
      <SignalField
        palette={palette}
        quality={quality}
        frozen={reducedMotion}
        hoverAnchor={hoverAnchor}
      />
      {showLabels
        ? hero.labels.map((label, index) => (
            <FloatingLabel
              key={label.text}
              index={index}
              reducedMotion={reducedMotion}
              onHover={setHoverAnchor}
            />
          ))
        : null}

      <EffectComposer frameBufferType={THREE.HalfFloatType}>
        <Bloom
          mipmapBlur
          intensity={bloom.intensity}
          luminanceThreshold={bloom.luminanceThreshold}
          luminanceSmoothing={bloom.luminanceSmoothing}
          radius={bloom.radius}
        />
      </EffectComposer>
    </Canvas>
  );
}
