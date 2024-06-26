uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 2.0 * vDisplacement * u_intensity;

    vec3 color = vec3(1.0,0.05, 0.1);

    gl_FragColor = vec4(color, 1.0);
}
