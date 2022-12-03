// Uniforms.
uniform mat4 uMV;
uniform mat4 uP;
uniform mat4 uMVn;
uniform mat4 uMVP;

// Camera space position.
varying vec3 fPosition;
// Vertex color.
varying vec3 fColor;
// Model space normal.
varying vec2 fNormal;
// Texture coordinates.
varying vec2 fTexCoord;

void main(){
    gl_FragColor = vec4(fColor, 1.0);
}