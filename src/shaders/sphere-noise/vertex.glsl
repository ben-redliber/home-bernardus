#pragma glslify: cnoise = require(glsl-noise/periodic/3d)

uniform float u_time;
uniform float u_intensity;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    vUv = uv;
    vDisplacement = cnoise(position + vec3(1.5 * u_time), vec3(100.0));

    vec3 newPosition = position + normal * (u_intensity * vDisplacement);

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
