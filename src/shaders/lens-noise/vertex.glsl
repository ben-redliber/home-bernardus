#pragma glslify: cnoise = require(glsl-noise/simplex/3d)

uniform float u_time;
uniform float u_intensity;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    vUv = uv;
    vDisplacement = cnoise(position + vec3(1.5 * u_time));

    vec3 newPosition = position + normal * (u_intensity * vDisplacement);

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    // modelPosition.y += sin(modelPosition.x * 4.0 + u_time * 12.0) * 0.2;
    // modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
