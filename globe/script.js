const renderer = new THREE.WebGLRenderer({antialias: true});
const canvas = document.querySelector('#canvas');

let frag = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#include "lygia/math/const.glsl"
#include "lygia/space/ratio.glsl"

#include "lygia/sdf/triSDF.glsl"
#include "lygia/sdf/rectSDF.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/space/rotate.glsl"

#include "lygia/generative/snoise.glsl"
#include "lygia/color/space/hsv2rgb.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = ratio(st, u_resolution);

    float grid = 20.0;
    vec2 st_i = floor(st * grid)/grid;
    vec2 st_f = fract(st * grid);
    float n = 0.5 + snoise(vec3(st_i, u_time)) * 0.5;

    float a = n * PI*2.;
    st_f = rotate(st_f, a);

    color += hsv2rgb(vec3(n * 0.2, 1.0, 1.0));
    float sdf = triSDF(st_f);
    color += fill(sdf, .5);

    gl_FragColor = vec4(color, 1.0);
}
`