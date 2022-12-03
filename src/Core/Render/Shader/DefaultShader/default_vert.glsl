// Model space position.
attribute vec3 vPosition;
// Model space normal.
attribute vec3 vNormal;
// Vertex color.
attribute vec4 vColor;
// Texture coordinates.
attribute vec2 vTexCoord;

// Uniforms.
uniform mat4 uMV;
uniform mat4 uP;
uniform mat4 uMVn;
uniform mat4 uMVP;

// Camera space position.
varying vec3 fPosition;
// Vertex color.
varying vec4 fColor;
// Model space normal.
varying vec3 fNormal;
// Texture coordinates.
varying vec2 fTexCoord;

void main(void){
    // Camera space position.
    fPosition = (uMV * vec4(vPosition, 1.0)).xyz;
    fColor = vColor;
    // Model space normal.
    fNormal = vNormal;
    fTexCoord = vTexCoord;

    // NDC vertex position.
    gl_Position = uMVP * vec4(vPosition, 1.0);
}