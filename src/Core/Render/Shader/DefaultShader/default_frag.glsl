precision highp float;

// Uniforms matrice.
uniform mat4 uV;

// Uniform light data.
uniform vec3 uDirLight;

uniform sampler2D tex1;

// Camera space position.
varying vec3 fPosition;
// Vertex color.
varying vec4 fColor;
// Model space normal.
varying vec3 fNormal;
// Texture coordinates.
varying vec2 fTexCoord;

// Ambient light.
const vec4 ambientColor = vec4(1, 0, 0, 1);
const float ambientIntensity = 0.1;
// Specular settings.
const float specularExp = 128.0;
// Sun light.
const vec4 dirLightColor = vec4(1, 1, 0.5, 1);
const float dirLightIntensity = 1.0;
// Point light.
const vec4 pointLightColor = vec4(0, 1, 0, 1);
const float pointLightIntensity = 1.0;
const float pointLightDistance = 2.0;
const float pointLightRotateSpeed = 15.0;
// Fresnel effect.
const bool useFresnelEffect = true;
const vec4 fresnelColor = vec4(1, 1, 0, 1);
const float fresnelExp = 5.0;
const float fresnelThreshold = 0.3;

vec2 getDiffuseSpecular(vec3 l, vec3 h, vec3 n, float i) {
  // Diffuse light.
  float diffuseIntensity = max(0.0, dot(n, l));
  diffuseIntensity = diffuseIntensity * i;

  // Specular light.
  float specularIntensity = max(0.0, pow(max(0.0, dot(n, h)), specularExp));
  specularIntensity = specularIntensity * i;

  return vec2(diffuseIntensity, specularIntensity);
}

void main() {
  // Base color.
  vec4 baseColor = texture2D(tex1, fTexCoord);

    // Constants.
  vec3 n = normalize(fNormal);
  vec3 e = normalize(-fPosition);

    // Ambient light.
  vec4 ambientLight = ambientColor * ambientIntensity;

    // Sun light.
  vec3 dirLight = (uV * vec4(uDirLight, 0)).xyz;
  vec3 sl = normalize(dirLight);
  vec3 sh = normalize(e + sl);

  vec2 sds = getDiffuseSpecular(sl, sh, n, dirLightIntensity);

  vec4 sunLight = dirLightColor * sds.x;
  sunLight = sunLight + dirLightColor * sds.y;

  vec4 color = vec4(0, 0, 0, 1);
    // Apply ambient light.
  color = color + baseColor * ambientLight;
    // Apply sun light.
  color = color + baseColor * sunLight;

  gl_FragColor = color;
}