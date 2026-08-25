/**
 * Shader for the hero's instanced dot terrain.
 *
 * Everything happens on the GPU: the terrain height is sampled from 3D simplex
 * noise per instance per frame, and the "signal" value — distance from the
 * focal point crossed with a slow radial pulse — drives colour, scale, and
 * therefore which instances cross the bloom threshold.
 *
 * The quads are billboarded in view space so every dot faces the camera at any
 * angle, rather than flattening to slivers toward the horizon.
 */

/** Simplex 3D noise — Ashima Arts / Stefan Gustavson, MIT. */
const SIMPLEX_3D = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

export const signalFieldVertexShader = /* glsl */ `
uniform float uTime;
uniform vec2  uFocal;
uniform vec2  uHover;
uniform float uHoverStrength;
uniform float uAmplitude;
uniform float uFrequency;
uniform float uRadius;
uniform float uPulseSpeed;
uniform float uDotSize;

varying vec2  vUv;
varying float vSignal;
varying float vCrest;
varying float vDepth;
varying float vSide;

${SIMPLEX_3D}

void main() {
  // instanceMatrix carries the jittered base position (translation) and the
  // per-instance size variation (uniform scale on the diagonal).
  vec3  base = instanceMatrix[3].xyz;
  float sizeJitter = instanceMatrix[0][0];

  // Two octaves of noise: a broad swell plus a finer ripple, so the terrain
  // rolls organically instead of breathing as one sheet.
  float swell = snoise(vec3(base.x * uFrequency, base.z * uFrequency, uTime * 0.085));
  float ripple = snoise(vec3(
    base.x * uFrequency * 2.4 + 13.0,
    base.z * uFrequency * 2.4 - 7.0,
    uTime * 0.13
  )) * 0.42;
  float height = (swell + ripple) * uAmplitude;

  // Signal strength: a slow ring travelling out from the focal source, gated
  // hard by distance. The falloff is squared so the accent stays a cluster
  // instead of tinting the whole field warm.
  float focalDist = distance(base.xz, uFocal);
  float pulse = 0.5 + 0.5 * sin(uTime * uPulseSpeed - focalDist * 0.55);
  float falloff = 1.0 - smoothstep(0.0, uRadius, focalDist);
  falloff *= falloff;
  float signal = falloff * (0.2 + 0.8 * pulse);

  // Hovering a floating label lights the cluster nearest its anchor.
  float hoverDist = distance(base.xz, uHover);
  float hoverFalloff = 1.0 - smoothstep(0.0, 3.6, hoverDist);
  signal += uHoverStrength * hoverFalloff * hoverFalloff * 0.9;

  vSignal = clamp(signal, 0.0, 1.2);
  // Crests carry a little more presence than troughs, which is what makes the
  // undulation legible without brightening the dots toward the accent.
  vCrest = smoothstep(0.15, 1.0, swell);
  vUv = uv;
  vSide = base.x;

  vec4 viewCentre = modelViewMatrix * vec4(base.x, base.y + height, base.z, 1.0);
  vDepth = -viewCentre.z;

  // Billboard: expand the quad in view space so dots always face the camera.
  float scale = uDotSize * sizeJitter * (1.0 + vSignal * 0.95);
  viewCentre.xy += position.xy * scale;

  gl_Position = projectionMatrix * viewCentre;
}
`;

export const signalFieldFragmentShader = /* glsl */ `
uniform vec3  uBaseColor;
uniform vec3  uAccentColor;
uniform float uBaseGain;
uniform float uAccentGain;
uniform float uNear;
uniform float uFar;
uniform float uMinAlpha;
uniform float uSideDim;
uniform float uFade;

varying vec2  vUv;
varying float vSignal;
varying float vCrest;
varying float vDepth;
varying float vSide;

void main() {
  // Circular mask with a soft edge — a square dot reads as a glitch at scale.
  float d = length(vUv - 0.5);
  float alpha = 1.0 - smoothstep(0.36, 0.5, d);
  if (alpha <= 0.001) discard;

  // Base dots stay under the bloom threshold; only the accent is gained past
  // it, which is what keeps the effect reading as "signal" rather than haze.
  vec3 color = mix(
    uBaseColor * uBaseGain,
    uAccentColor * uAccentGain,
    smoothstep(0.14, 0.95, vSignal)
  );

  // Atmospheric recession. Most of the depth cue comes from perspective doing
  // its job on the dot size, so this stays gentle through the mid-ground and
  // only really bites at the horizon — otherwise the whole field goes grey.
  float far = 1.0 - smoothstep(uNear, uFar, vDepth);
  alpha *= mix(uMinAlpha, 1.0, far);

  // The nearest row would otherwise loom into frame as a few huge blots.
  alpha *= smoothstep(1.5, 6.0, vDepth);
  alpha *= mix(0.82, 1.0, vCrest);

  // The headline sits over the left of the frame, so the field is held back
  // there. The composition stays weighted to the focal source on the right.
  alpha *= mix(uSideDim, 1.0, smoothstep(-13.0, -1.5, vSide));
  alpha *= uFade;

  gl_FragColor = vec4(color, alpha);
}
`;
