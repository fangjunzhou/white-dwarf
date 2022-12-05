import { Attributes, Entity } from "ecsy-wd";
import { TransformData3D } from "../../../Core/Locomotion/DataComponent/TransformData3D";
import { EditorViewPortWebGLSystem } from "./EditorViewPortWebGLSystem";
import point_vert from "../../../Core/Render/Shader/EditorShader/point_vert.glsl";
import point_frag from "../../../Core/Render/Shader/EditorShader/point_frag.glsl";
import line_vert from "../../../Core/Render/Shader/EditorShader/line_vert.glsl";
import line_frag from "../../../Core/Render/Shader/EditorShader/line_frag.glsl";
import { mat3, mat4 } from "gl-matrix";

export class EditorViewPortWebGLTransformSystem extends EditorViewPortWebGLSystem {
  // WebGL shaders.
  pointAttributes: { [key: string]: number } = {
    vPosition: -1,
    vColor: -1,
  };
  pointUniforms: { [key: string]: WebGLUniformLocation | null } = {
    uMV: null,
    uP: null,
    uMVn: null,
    uMVP: null,
  };
  pointShader: WebGLProgram | null = null;

  axisAttributes: { [key: string]: number } = {
    vPosition: -1,
    vColor: -1,
  };
  axisUniforms: { [key: string]: WebGLUniformLocation | null } = {
    uMV: null,
    uP: null,
    uMVn: null,
    uMVP: null,
  };
  axisShader: WebGLProgram | null = null;

  // WebGL buffers.
  vertexPositionBufferItemSize = 3;
  vertexColorBufferItemSize = 4;

  pointVertexPositionBuffer: WebGLBuffer | null = null;
  pointVertexColorBuffer: WebGLBuffer | null = null;
  axisVertexPositionBuffer: WebGLBuffer | null = null;
  axisVertexColorBuffer: WebGLBuffer | null = null;

  // Settings.
  pointColor = [1.0, 1.0, 1.0, 1.0];

  public init(attributes?: Attributes | undefined): void {
    super.init(attributes);

    // Initialize WebGL buffers.
    const pointVertices = new Float32Array([0, 0, 0]);
    this.pointVertexPositionBuffer = this.glContext.createBuffer();
    this.glContext.bindBuffer(
      this.glContext.ARRAY_BUFFER,
      this.pointVertexPositionBuffer
    );
    this.glContext.bufferData(
      this.glContext.ARRAY_BUFFER,
      pointVertices,
      this.glContext.STATIC_DRAW
    );

    const pointColors = new Float32Array(this.pointColor);
    this.pointVertexColorBuffer = this.glContext.createBuffer();
    this.glContext.bindBuffer(
      this.glContext.ARRAY_BUFFER,
      this.pointVertexColorBuffer
    );
    this.glContext.bufferData(
      this.glContext.ARRAY_BUFFER,
      pointColors,
      this.glContext.STATIC_DRAW
    );

    const axixVertices = new Float32Array(
      [
        [0, 0, 0],
        [1, 0, 0],
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
        [0, 0, 1],
      ].flat()
    );
    this.axisVertexPositionBuffer = this.glContext.createBuffer();
    this.glContext.bindBuffer(
      this.glContext.ARRAY_BUFFER,
      this.axisVertexPositionBuffer
    );
    this.glContext.bufferData(
      this.glContext.ARRAY_BUFFER,
      axixVertices,
      this.glContext.STATIC_DRAW
    );

    const axisColors = new Float32Array(
      [
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [0, 1, 0, 1],
        [0, 1, 0, 1],
        [0, 0, 1, 1],
        [0, 0, 1, 1],
      ].flat()
    );
    this.axisVertexColorBuffer = this.glContext.createBuffer();
    this.glContext.bindBuffer(
      this.glContext.ARRAY_BUFFER,
      this.axisVertexColorBuffer
    );
    this.glContext.bufferData(
      this.glContext.ARRAY_BUFFER,
      axisColors,
      this.glContext.STATIC_DRAW
    );

    // Compile and link the shader program.
    this.pointShader = this.compileShader(
      point_vert,
      point_frag,
      this.pointAttributes,
      this.pointUniforms
    );

    this.axisShader = this.compileShader(
      line_vert,
      line_frag,
      this.axisAttributes,
      this.axisUniforms
    );
  }

  public drawInspectEntity(
    entity: Entity,
    transform: TransformData3D,
    tView: mat4,
    tProjection: mat4
  ): void {
    // Model matrix.
    const tModel = this.getModelMatrix(transform, true);
    // MV matrix.
    const tMV = mat4.create();
    mat4.multiply(tMV, tView, tModel);
    // MVn matrix.
    const tMVn = mat3.create();
    mat3.normalFromMat4(tMVn, tMV);
    // MVP matrix.
    const tMVP = mat4.create();
    mat4.multiply(tMVP, tProjection, tMV);

    // Draw the transform point gizmo.
    this.drawPoint(tMV, tProjection, tMVn, tMVP);
    // Draw the transform axis gizmo.
    this.drawAxis(tMV, tProjection, tMVn, tMVP);
  }

  /**
   * Draw the gizmo point.
   * @param tMV
   * @param tProjection
   * @param tMVn
   * @param tMVP
   */
  private drawPoint(tMV: mat4, tProjection: mat4, tMVn: mat3, tMVP: mat4) {
    // Disable z testing.
    this.glContext.disable(this.glContext.DEPTH_TEST);

    this.glContext.useProgram(this.pointShader);

    // Set the shader uniforms.
    this.setUniforms(this.pointUniforms, tMV, tProjection, tMVn, tMVP);

    // Set the shader attributes.
    this.glContext.bindBuffer(
      this.glContext.ARRAY_BUFFER,
      this.pointVertexPositionBuffer
    );
    this.glContext.vertexAttribPointer(
      this.pointAttributes.vPosition as number,
      this.vertexPositionBufferItemSize,
      this.glContext.FLOAT,
      false,
      0,
      0
    );
    this.glContext.bindBuffer(
      this.glContext.ARRAY_BUFFER,
      this.pointVertexColorBuffer
    );
    this.glContext.vertexAttribPointer(
      this.pointAttributes.vColor as number,
      this.vertexColorBufferItemSize,
      this.glContext.FLOAT,
      false,
      0,
      0
    );

    this.glContext.drawArrays(this.glContext.POINTS, 0, 1);

    // Enable z testing.
    this.glContext.enable(this.glContext.DEPTH_TEST);
  }

  /**
   * Draw the axis lines.
   * @param tMV
   * @param tProjection
   * @param tMVn
   * @param tMVP
   */
  private drawAxis(tMV: mat4, tProjection: mat4, tMVn: mat3, tMVP: mat4) {
    this.glContext.disable(this.glContext.DEPTH_TEST);

    this.glContext.useProgram(this.axisShader);

    // Set the shader uniforms.
    this.setUniforms(this.axisUniforms, tMV, tProjection, tMVn, tMVP);

    // Set the shader attributes.
    this.glContext.bindBuffer(
      this.glContext.ARRAY_BUFFER,
      this.axisVertexPositionBuffer
    );
    this.glContext.vertexAttribPointer(
      this.axisAttributes.vPosition as number,
      this.vertexPositionBufferItemSize,
      this.glContext.FLOAT,
      false,
      0,
      0
    );

    this.glContext.bindBuffer(
      this.glContext.ARRAY_BUFFER,
      this.axisVertexColorBuffer
    );
    this.glContext.vertexAttribPointer(
      this.axisAttributes.vColor as number,
      this.vertexColorBufferItemSize,
      this.glContext.FLOAT,
      false,
      0,
      0
    );

    this.glContext.drawArrays(this.glContext.LINES, 0, 6);

    this.glContext.enable(this.glContext.DEPTH_TEST);
  }

  /**
   * Set the uniforms for glContext.
   * @param tMV
   * @param tProjection
   * @param tMVn
   * @param tMVP
   */
  private setUniforms(
    uniforms: { [key: string]: WebGLUniformLocation | null },
    tMV: mat4,
    tProjection: mat4,
    tMVn: mat3,
    tMVP: mat4
  ) {
    this.glContext.uniformMatrix4fv(
      uniforms.uMV as WebGLUniformLocation,
      false,
      tMV
    );
    this.glContext.uniformMatrix4fv(
      uniforms.uP as WebGLUniformLocation,
      false,
      tProjection
    );
    this.glContext.uniformMatrix3fv(
      uniforms.uMVn as WebGLUniformLocation,
      false,
      tMVn
    );
    this.glContext.uniformMatrix4fv(
      uniforms.uMVP as WebGLUniformLocation,
      false,
      tMVP
    );
  }

  /**
   * Compile the shader program and get the attribute and uniform locations.
   * @param vertexSource vertex shader source code.
   * @param fragmentSource fragment shader source code.
   * @param attributes vertex attributes location dictionary.
   * @param uniforms uniform location dictionary.
   * @returns compiled shader program.
   */
  private compileShader(
    vertexSource: string,
    fragmentSource: string,
    attributes: { [key: string]: number },
    uniforms: { [key: string]: WebGLUniformLocation | null }
  ): WebGLProgram {
    // Compile vertex shader.
    const pointVertexShader = this.glContext.createShader(
      this.glContext.VERTEX_SHADER
    ) as WebGLShader;
    if (!pointVertexShader) {
      throw new Error("Failed to create point vertex shader.");
    }
    this.glContext.shaderSource(pointVertexShader, vertexSource);
    this.glContext.compileShader(pointVertexShader);
    if (
      !this.glContext.getShaderParameter(
        pointVertexShader,
        this.glContext.COMPILE_STATUS
      )
    ) {
      throw new Error(
        this.glContext.getShaderInfoLog(pointVertexShader) as string
      );
    }

    // Compile fragment shader.
    const pointFragmentShader = this.glContext.createShader(
      this.glContext.FRAGMENT_SHADER
    ) as WebGLShader;
    if (!pointFragmentShader) {
      throw new Error("Failed to create point fragment shader.");
    }
    this.glContext.shaderSource(pointFragmentShader, fragmentSource);
    this.glContext.compileShader(pointFragmentShader);
    if (
      !this.glContext.getShaderParameter(
        pointFragmentShader,
        this.glContext.COMPILE_STATUS
      )
    ) {
      throw new Error(
        this.glContext.getShaderInfoLog(pointFragmentShader) as string
      );
    }

    // Compile and link shader program.
    const shaderProgram = this.glContext.createProgram();
    if (!shaderProgram) {
      throw new Error("Failed to create point shader program.");
    }
    this.glContext.attachShader(shaderProgram, pointVertexShader);
    this.glContext.attachShader(shaderProgram, pointFragmentShader);
    this.glContext.linkProgram(shaderProgram);
    if (
      !this.glContext.getProgramParameter(
        shaderProgram,
        this.glContext.LINK_STATUS
      )
    ) {
      throw new Error(
        this.glContext.getProgramInfoLog(shaderProgram) as string
      );
    }

    // Get the attribute and uniform locations.
    for (const key in attributes) {
      const location = this.glContext.getAttribLocation(shaderProgram, key);
      attributes[key] = location;
      this.glContext.enableVertexAttribArray(location);
    }

    for (const key in uniforms) {
      const location = this.glContext.getUniformLocation(shaderProgram, key);
      uniforms[key] = location;
    }

    return shaderProgram;
  }
}
