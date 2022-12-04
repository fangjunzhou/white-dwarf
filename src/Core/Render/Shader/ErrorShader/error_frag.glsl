precision highp float;

// Uniforms matrice.
uniform mat4 uMV;
uniform mat4 uP;
uniform mat3 uMVn;
uniform mat4 uMVP;

// Camera space position.
varying vec3 fPosition;
// Vertex color.
varying vec4 fColor;
// Model space normal.
varying vec3 fNormal;
// Texture coordinates.
varying vec2 fTexCoord;

void main(){
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
}