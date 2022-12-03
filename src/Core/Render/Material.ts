import { cloneClonable, copyCopyable, createType } from "ecsy-wd";
import default_vert from "./Shader/DefaultShader/default_vert.glsl";
import default_frag from "./Shader/DefaultShader/default_frag.glsl";

export class Material {
  glContext: WebGLRenderingContext;

  vertexSource: string;
  fragmentSource: string;
  attributes: string[] = [];
  uniforms: string[] = [];
  textureSamplers: string[] = [];

  vertexShader: WebGLShader | null = null;
  fragmentShader: WebGLShader | null = null;

  shaderProgram: WebGLProgram | null = null;

  // Attributes.
  attributeLocations: { [key: string]: number } = {};
  // Uniforms.
  uniformLocations: { [key: string]: WebGLUniformLocation } = {};
  // Texture samplers.
  samplerLocations: { [key: string]: WebGLUniformLocation } = {};

  constructor(
    glContext: WebGLRenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string,
    attributes: string[] = ["vPosition", "vNormal", "vColor", "vTexCoord"],
    uniforms: string[] = ["uMV", "uP", "uMVn", "uMVP"],
    textureSamplers: string[] = []
  ) {
    this.glContext = glContext;
    this.vertexSource = vertexShaderSource;
    this.fragmentSource = fragmentShaderSource;
    this.attributes = attributes;
    this.uniforms = uniforms;
    this.textureSamplers = textureSamplers;

    this.compile(
      glContext,
      vertexShaderSource,
      fragmentShaderSource,
      attributes,
      uniforms,
      textureSamplers
    );
  }

  compile(
    glContext: WebGLRenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string,
    attributes: string[] = ["vPosition", "vNormal", "vColor", "vTexCoord"],
    uniforms: string[] = ["uMV", "uMVn", "uMVP"],
    textureSamplers: string[] = []
  ) {
    // Compile vertex shader.
    this.vertexShader = glContext.createShader(
      glContext.VERTEX_SHADER
    ) as WebGLShader;
    if (!this.vertexShader) {
      throw new Error("Failed to create vertex shader");
    }
    glContext.shaderSource(this.vertexShader, vertexShaderSource);
    glContext.compileShader(this.vertexShader);
    if (
      !glContext.getShaderParameter(this.vertexShader, glContext.COMPILE_STATUS)
    ) {
      throw new Error("Failed to compile vertex shader");
    }

    // Compile fragment shader.
    this.fragmentShader = glContext.createShader(
      glContext.FRAGMENT_SHADER
    ) as WebGLShader;
    if (!this.fragmentShader) {
      throw new Error("Failed to create fragment shader");
    }
    glContext.shaderSource(this.fragmentShader, fragmentShaderSource);
    glContext.compileShader(this.fragmentShader);
    if (
      !glContext.getShaderParameter(
        this.fragmentShader,
        glContext.COMPILE_STATUS
      )
    ) {
      throw new Error("Failed to compile fragment shader");
    }

    // Create shader program.
    this.shaderProgram = glContext.createProgram();
    if (!this.shaderProgram) {
      throw new Error("Failed to create shader program");
    }
    glContext.attachShader(this.shaderProgram, this.vertexShader);
    glContext.attachShader(this.shaderProgram, this.fragmentShader);
    glContext.linkProgram(this.shaderProgram);
    if (
      !glContext.getProgramParameter(this.shaderProgram, glContext.LINK_STATUS)
    ) {
      throw new Error("Failed to link shader program");
    }

    // Get attribute locations.
    for (const attribute of attributes) {
      this.attributeLocations[attribute] = glContext.getAttribLocation(
        this.shaderProgram,
        attribute
      );
      glContext.enableVertexAttribArray(this.attributeLocations[attribute]);
    }

    // Get uniform locations.
    for (const uniform of uniforms) {
      this.uniformLocations[uniform] = glContext.getUniformLocation(
        this.shaderProgram,
        uniform
      ) as WebGLUniformLocation;
    }

    // Get texture sampler locations.
    for (let i = 0; i < textureSamplers.length; i++) {
      const element = textureSamplers[i];
      this.samplerLocations[element] = glContext.getUniformLocation(
        this.shaderProgram,
        element
      ) as WebGLUniformLocation;
      glContext.uniform1i(this.samplerLocations[element], i);
    }
  }

  use() {
    this.glContext.useProgram(this.shaderProgram);
  }

  copy(m: Material): Material {
    this.vertexSource = m.vertexSource;
    this.fragmentSource = m.fragmentSource;
    this.attributes = m.attributes;
    this.uniforms = m.uniforms;
    this.textureSamplers = m.textureSamplers;

    this.compile(
      this.glContext,
      this.vertexSource,
      this.fragmentSource,
      this.attributes,
      this.uniforms,
      this.textureSamplers
    );

    return this;
  }

  clone(): Material {
    return new Material(
      this.glContext,
      this.vertexSource,
      this.fragmentSource,
      this.attributes,
      this.uniforms,
      this.textureSamplers
    );
  }
}

export const MaterialType = createType({
  name: "Material",
  default: new Material(null as any, default_vert, default_frag, [], [], []),
  copy: copyCopyable<Material>,
  clone: cloneClonable<Material>,
});
