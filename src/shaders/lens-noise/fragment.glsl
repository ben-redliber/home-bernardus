uniform float u_intensity;
uniform float u_time;
uniform sampler2D u_texture;
uniform vec2 u_resolution;

varying vec2 vUv;
varying float vDisplacement;

vec4 fromLinear(vec4 linearRGB) {
    bvec3 cutoff = lessThan(linearRGB.rgb, vec3(0.0031308));
    vec3 higher = vec3(1.055) * pow(linearRGB.rgb, vec3(1.0 / 2.4)) - vec3(0.055);
    vec3 lower = linearRGB.rgb * vec3(12.92);

    return vec4(mix(higher, lower, cutoff), linearRGB.a);
}

void main() {
    // vec4 color = vec4(1.0, 0.05, 0.1, 1.0);
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec4 color = fromLinear(texture2D(u_texture, uv));
    // vec4 color = texture2D(u_texture, uv);

    gl_FragColor = color;
}
