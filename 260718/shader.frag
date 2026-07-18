precision mediump float;

varying vec2 vTexCoord;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

void main() {
    vec2 uv = vTexCoord.xy-0.5;

    float a=length(vec2(uv.x,uv.y*1.5));
    a=step(a,0.5);

    float b=length(vec2(uv.x*1.3,uv.y*2.2));
    b=step(b,0.5);

    float c=length(vec2(uv.x*2.2,uv.y*3.1));
    c=step(c,0.5);

    vec3 m=(1.0-a)*vec3(129.0, 109.0, 207.0);
    vec3 n=(a-b)*vec3(200.0, 180.0, 253.0);
    vec3 p=(b-c)*vec3(232.0, 206.0, 253.0);
    vec3 q=(c)*vec3(236.0, 219.0, 253.0);

    vec3 col=(m+n+p+q)/255.0;

    gl_FragColor = vec4(col, 1.0);
}
