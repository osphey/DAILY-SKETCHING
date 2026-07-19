precision mediump float;

varying vec2 vTexCoord;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

void main() {
    vec2 uv = vTexCoord.xy;
    float y=fract(uv.y*10.0+uTime);
    y=step(y,cos(uTime*4.0)*0.5+0.5);

    uv=vec2(cos(uTime)*0.5+0.5,y);

    vec3 color = vec3(uv,0.5);

    gl_FragColor = vec4(color, 1.0);
}
