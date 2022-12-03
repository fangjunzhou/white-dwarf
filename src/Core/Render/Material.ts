import { cloneClonable, copyCopyable, createType } from "ecsy-wd";
import default_vert from "./Shader/DefaultShader/default_vert.glsl";
import default_frag from "./Shader/DefaultShader/default_frag.glsl";

interface BasicShaderAttribute {
  vPosition?: number;
  vNormal?: number;
  vColor?: number;
  vTexCoord?: number;
}

interface BasicShaderUniform {
  uMV?: WebGLUniformLocation;
  uMVn?: WebGLUniformLocation;
  uMVP?: WebGLUniformLocation;
}

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
  attributeLocations: BasicShaderAttribute = {};
  // Uniforms.
  uniformLocations: BasicShaderUniform = {};
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

    if (!this.glContext) {
      return;
    }

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
      throw new Error(glContext.getShaderInfoLog(this.vertexShader) as string);
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
      throw new Error(
        glContext.getShaderInfoLog(this.fragmentShader) as string
      );
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
      const location = glContext.getAttribLocation(
        this.shaderProgram,
        attribute
      );

      this.attributeLocations[
        attribute as keyof typeof this.attributeLocations
      ] = location;

      glContext.enableVertexAttribArray(location);
    }

    // Get uniform locations.
    for (const uniform of uniforms) {
      this.uniformLocations[uniform as keyof typeof this.uniformLocations] =
        glContext.getUniformLocation(
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

  use(glContext: WebGLRenderingContext) {
    glContext.useProgram(this.shaderProgram);
  }
}
