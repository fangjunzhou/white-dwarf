precision highp float;

// Camera space position.
varying vec3 fPosition;
// Vertex color.
varying vec4 fColor;

void main(){
    gl_FragColor = fColor;
}