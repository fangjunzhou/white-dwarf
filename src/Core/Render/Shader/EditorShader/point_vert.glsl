// Model space vertex position.
attribute vec3 vPosition;
// Vertex color.
attribute vec4 vColor;

// Uniforms.
uniform mat4 uMV;
uniform mat4 uP;
uniform mat3 uMVn;
uniform mat4 uMVP;

// Camera space position.
varying vec3 fPosition;
// Vertex color.
varying vec4 fColor;

void main(){
    // Camera space position.
    fPosition = (uMV * vec4(vPosition, 1.0)).xyz;
    // Vertex color.
    fColor = vColor;

    // NDC vertex position.
    gl_Position = uMVP * vec4(vPosition, 1.0);
    gl_PointSize = 10.0;
}