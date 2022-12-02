declare module 'white-dwarf/Core/ComponentRegistry' {
  import { Component, ComponentConstructor } from "ecsy-wd";
  export interface IComponent extends Component<IComponent> {
  }
  export namespace IComponent {
      function getImplementations(): ComponentConstructor<IComponent>[];
      function register<T extends ComponentConstructor<IComponent>>(ctor: T): T;
  }

}
declare module 'white-dwarf/Core/Context/RenderContext' {
  import { Entity } from "ecsy-wd";
  export interface IEditorRenderContext {
      mainCanvas: HTMLCanvasElement | null;
      mainCamera: Entity | null;
  }
  export const coreRenderContext: IEditorRenderContext;

}
declare module 'white-dwarf/Core/Context/SystemContext' {
  import { IWorldObject } from "white-dwarf/Core/Serialization/WorldSerializer";
  export interface CoreStartProps {
      worldObject?: IWorldObject;
  }
  export interface ISystemContext {
      /**
       * Callback function when engine core setup is called.
       * Core setup is the first function called by the engine.
       * Called both in editor edit mode and release mode.
       */
      coreSetup: () => void;
      /**
       * Callback game begin function.
       * Called only in release mode and editor play mode.
       * Register game play systems here.
       */
      coreStart: (props: CoreStartProps) => Promise<void>;
      /**
       * Callback when editor is initialized.
       * Register editor related systems here.
       */
      editorStart: () => void;
  }

}
declare module 'white-dwarf/Core/Context/TimeContext' {
  export interface ITimeContext {
      startTime: number;
      currentTime: number;
      deltaTime: number;
      timeScale: number;
      fixedTimeStep: number;
  }

}
declare module 'white-dwarf/Core/CoreSetup' {
  import { ISystemContext } from "white-dwarf/Core/Context/SystemContext";
  export const coreSetup: () => void;
  export const systemContext: ISystemContext;

}
declare module 'white-dwarf/Core/index' {
  import { World } from "ecsy-wd";
  import { ITimeContext } from "white-dwarf/Core/Context/TimeContext";
  export let mainWorld: World<import("ecsy-wd")._Entity>;
  export let physicsWorld: World<import("ecsy-wd")._Entity>;
  export const timeContext: ITimeContext;
  export const releaseInit: () => Promise<void>;
  export const mainInit: () => void;
  export const resetWorld: () => void;

}
declare module 'white-dwarf/Core/Locomotion/DataComponent/HermiteCurveData2D' {
  import { Component, ComponentSchema } from "ecsy-wd";
  import { HermiteCurve2DSegment } from "white-dwarf/Mathematics/HermiteCurveSegment";
  export class HermiteCurveData2D extends Component<HermiteCurveData2D> {
      static schema: ComponentSchema;
      segments: HermiteCurve2DSegment[];
      resolution: number;
      useDefaultInspector: boolean;
      onInspector: (componentDiv: HTMLDivElement) => void;
      private RepopulateCurveUI;
      private populateSegmentEditor;
  }

}
declare module 'white-dwarf/Core/Locomotion/DataComponent/HermiteCurveMoveData' {
  import { Component, ComponentSchema } from "ecsy-wd";
  export class HermiteCurveMoveData extends Component<HermiteCurveMoveData> {
      static schema: ComponentSchema;
      time: number;
      loop: boolean;
      speed: number;
      controlRotation: boolean;
      useDefaultInspector: boolean;
      onInspector: (componentDiv: HTMLDivElement) => void;
  }

}
declare module 'white-dwarf/Core/Locomotion/DataComponent/TransformData2D' {
  import { Component, ComponentSchema } from "ecsy-wd";
  import { Vector2 } from "white-dwarf/Mathematics/Vector2";
  export class TransformData2D extends Component<TransformData2D> {
      static schema: ComponentSchema;
      position: Vector2;
      rotation: number;
      scale: Vector2;
      useDefaultInspector: boolean;
      onInspector: (componentDiv: HTMLDivElement) => void;
  }

}
declare module 'white-dwarf/Core/Locomotion/DataComponent/TransformData3D' {
  import { Component, ComponentSchema } from "ecsy-wd";
  import { Quaternion } from "white-dwarf/Mathematics/Quaternion";
  import { Vector3 } from "white-dwarf/Mathematics/Vector3";
  export class TransformData3D extends Component<TransformData3D> {
      static schema: ComponentSchema;
      position: Vector3;
      rotation: Quaternion;
      scale: Vector3;
      useDefaultInspector: boolean;
      onInspector: (componentDiv: HTMLDivElement) => void | null;
  }

}
declare module 'white-dwarf/Core/Locomotion/System/HermiteCurveLocomotionSystem' {
  import { System, SystemQueries } from "ecsy-wd";
  export class HermiteCurveLocomotionSystem extends System {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Physics/DataComponents/ConstraintData' {
  import { Component, ComponentSchema } from "ecsy-wd";
  import { Entity } from "ecsy-wd";
  export class Constraint {
      target: Entity;
      length: number;
      constructor(target: Entity, length: number);
  }
  export class ConstraintData extends Component<ConstraintData> {
      static schema: ComponentSchema;
      constraints: Array<Constraint>;
  }

}
declare module 'white-dwarf/Core/Physics/DataComponents/EulerVelocityData3D' {
  import { Component, ComponentSchema } from "ecsy-wd";
  import { Vector3 } from "white-dwarf/Mathematics/Vector3";
  export class EulerVelocityData3D extends Component<EulerVelocityData3D> {
      static schema: ComponentSchema;
      velocity: Vector3;
  }

}
declare module 'white-dwarf/Core/Physics/DataComponents/MassData' {
  import { Component, ComponentSchema } from "ecsy-wd";
  export class MassData extends Component<MassData> {
      static schema: ComponentSchema;
      mass: number;
  }

}
declare module 'white-dwarf/Core/Physics/DataComponents/SyncTransform3DData' {
  import { Component, ComponentSchema } from "ecsy-wd";
  import { TransformData3D } from "white-dwarf/Core/Locomotion/DataComponent/TransformData3D";
  export class SyncTransform3DData extends Component<SyncTransform3DData> {
      static schema: ComponentSchema;
      targetTransform: TransformData3D;
  }

}
declare module 'white-dwarf/Core/Physics/DataComponents/VerletVelocityData3D' {
  import { Component, ComponentSchema } from "ecsy-wd";
  import { Vector3 } from "white-dwarf/Mathematics/Vector3";
  export class VerletVelocityData3D extends Component<VerletVelocityData3D> {
      static schema: ComponentSchema;
      acceleration: Vector3;
      lastFramePosition: Vector3;
  }

}
declare module 'white-dwarf/Core/Physics/Systems/EulerVelocity3DGravitySystem' {
  import { System, SystemQueries } from "ecsy-wd";
  export class EulerVelocityGravitySystem extends System {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Physics/Systems/EulerVelocity3DMoveSystem' {
  import { System, SystemQueries } from "ecsy-wd";
  export class EulerVelocity3DMoveSystem extends System {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Physics/Systems/JakobsenConstraintSystem' {
  import { Attributes, System, SystemQueries } from "ecsy-wd";
  export class JakobsenConstraintSystem extends System {
      static queries: SystemQueries;
      jakobsenIterations: number;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Physics/Systems/Transform3DSyncSystem' {
  import { System, SystemQueries } from "ecsy-wd";
  export class Transform3DSyncSystem extends System {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Physics/Systems/VerletVelocity3DGravitySystem' {
  import { System, SystemQueries } from "ecsy-wd";
  export class VerletVelocity3DGravitySystem extends System {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Physics/Systems/VerletVelocity3DMoveSystem' {
  import { System, SystemQueries } from "ecsy-wd";
  /**
   * The system to move all the objects using verlet velocity.
   * This system must be called last.
   */
  export class VerletVelocity3DMoveSystem extends System {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Render/DataComponent/CameraData2D' {
  import { Component, ComponentSchema } from "ecsy-wd";
  export enum BackgroundType {
      Color = 0,
      Texture = 1
  }
  export class CameraData2D extends Component<CameraData2D> {
      static schema: ComponentSchema;
      backgroundType: BackgroundType;
      backgroundColor: string;
      backgroundTexture: string;
  }

}
declare module 'white-dwarf/Core/Render/DataComponent/ImageRenderData2D' {
  import { Component, ComponentSchema } from "ecsy-wd";
  import { Vector2 } from "white-dwarf/Mathematics/Vector2";
  export class ImageRenderData2D extends Component<ImageRenderData2D> {
      static schema: ComponentSchema;
      src: string;
      img: CanvasImageSource | null;
      imageCenter: Vector2;
      useDefaultInspector: boolean;
      onInspector: (componentDiv: HTMLDivElement) => void;
  }

}
declare module 'white-dwarf/Core/Render/DataComponent/LineFrameRenderData3D' {
  import { Component, ComponentSchema } from "ecsy-wd";
  import { LineFrame3DSegment } from "white-dwarf/Mathematics/LineFrame3DSegment";
  export class LineFrameRenderData3D extends Component<LineFrameRenderData3D> {
      static schema: ComponentSchema;
      color: string;
      segments: LineFrame3DSegment[];
      useDefaultInspector: boolean;
      onInspector: (componentDiv: HTMLDivElement) => void;
      private RepopulateCurveUI;
      private populateSegmentEditor;
  }

}
declare module 'white-dwarf/Core/Render/DataComponent/OrthographicCameraData3D' {
  import { Component, ComponentSchema } from "ecsy-wd";
  export class OrthographicCameraData3D extends Component<OrthographicCameraData3D> {
      static schema: ComponentSchema;
      left: number;
      right: number;
      top: number;
      bottom: number;
      near: number;
      far: number;
  }

}
declare module 'white-dwarf/Core/Render/DataComponent/PerspectiveCameraData3D' {
  import { Component, ComponentSchema } from "ecsy-wd";
  export class PerspectiveCameraData3D extends Component<PerspectiveCameraData3D> {
      static schema: ComponentSchema;
      fov: number;
      aspect: number;
      near: number;
      far: number;
      useDefaultInspector: boolean;
      onInspector: (componentDiv: HTMLDivElement) => void | null;
  }

}
declare module 'white-dwarf/Core/Render/RenderSystem2DRegister' {
  import { IWorldRegister } from "white-dwarf/Utils/IWorldRegister";
  export class RenderSystem2DRegister {
      mainCanvas: HTMLCanvasElement;
      constructor(mainCanvas: HTMLCanvasElement);
      register: IWorldRegister;
  }

}
declare module 'white-dwarf/Core/Render/RenderSystem3DRegister' {
  import { IWorldRegister } from "white-dwarf/Utils/IWorldRegister";
  export class RenderSystem3DRegister {
      mainCanvas: HTMLCanvasElement;
      constructor(mainCanvas: HTMLCanvasElement);
      register: IWorldRegister;
  }

}
declare module 'white-dwarf/Core/Render/System/BuildInRenderers/Canvas2DImageLoader' {
  import { System, SystemQueries } from "ecsy-wd";
  export class Canvas2DImageLoader extends System {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Render/System/BuildInRenderers/Canvas2DImageRenderer' {
  import { SystemQueries } from "ecsy-wd";
  import { Canvas2DRenderer } from "white-dwarf/Core/Render/System/Canvas2DRenderer";
  export class Canvas2DImageRenderer extends Canvas2DRenderer {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Render/System/BuildInRenderers/Canvas3DConstraintRenderer' {
  import { SystemQueries } from "ecsy-wd";
  import { Canvas3DRenderer } from "white-dwarf/Core/Render/System/Canvas3DRenderer";
  export class Canvas3DConstraintRenderer extends Canvas3DRenderer {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Render/System/BuildInRenderers/Canvas3DLineFrameRenderer' {
  import { SystemQueries } from "ecsy-wd";
  import { Canvas3DRenderer } from "white-dwarf/Core/Render/System/Canvas3DRenderer";
  export class Canvas3DLineFrameRenderer extends Canvas3DRenderer {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Render/System/Canvas2DRenderer' {
  import { Attributes, System, SystemQueries } from "ecsy-wd";
  import { mat3, vec2 } from "gl-matrix";
  import { TransformData2D } from "white-dwarf/Core/Locomotion/DataComponent/TransformData2D";
  /**
   * Base class for canvas renderers.
   */
  export class Canvas2DRenderer extends System {
      static queries: SystemQueries;
      mainCanvas: HTMLCanvasElement;
      canvasContext: CanvasRenderingContext2D;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
      /**
       * Construct a transform matrix from world position to camera space.
       *
       * @param camTransform The transform of the camera.
       * @param canvasSize the size of the canvas in vector2.
       */
      worldToCamera(camTransform: TransformData2D, canvasSize: vec2): mat3;
      /**
       * Construct a transform matrix from object space to world space.
       *
       * @param objTransform
       */
      objectToWorld(objTransform: TransformData2D): mat3;
  }

}
declare module 'white-dwarf/Core/Render/System/Canvas3DRenderer' {
  import { Attributes, System, SystemQueries } from "ecsy-wd";
  import { mat4, vec3 } from "gl-matrix";
  import { TransformData3D } from "white-dwarf/Core/Locomotion/DataComponent/TransformData3D";
  import { OrthographicCameraData3D } from "white-dwarf/Core/Render/DataComponent/OrthographicCameraData3D";
  import { PerspectiveCameraData3D } from "white-dwarf/Core/Render/DataComponent/PerspectiveCameraData3D";
  export class Canvas3DRenderer extends System {
      static queries: SystemQueries;
      mainCanvas: HTMLCanvasElement;
      canvasContext: CanvasRenderingContext2D;
      worldToCamera: mat4;
      cameraToScreen: mat4;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
      /**
       * Construct a transform matrix from world space to model space.
       * @param camTransform the transform of the camera.
       * @param camData the camera data.
       * @returns the world to model matrix.
       */
      orthographicWorldToCamera(camTransform: TransformData3D, camData: OrthographicCameraData3D): mat4;
      /**
       * Construct a transform matrix from world space to camera space.
       *
       * @param camTransform the transform of the camera.
       * @param camData the camera data.
       * @returns the world to camera matrix.
       */
      perspectiveWorldToCamera(camTransform: TransformData3D, camData: PerspectiveCameraData3D): mat4;
      /**
       * Construct a transform matrix from model space to world space.
       *
       * @param transform the transform of the model.
       * @returns the model to world matrix.
       */
      objectToWorld(transform: TransformData3D, dropScale?: boolean): mat4;
      generateCameraToScreenMatrix(): void;
      generateWorldToCameraMatrix(): void;
      drawLine(startPoint: vec3, endPoint: vec3, color: string, lineWidth: number): void;
  }

}
declare module 'white-dwarf/Core/Render/System/ClearCanvasSystem' {
  import { Attributes, System } from "ecsy-wd";
  export class ClearCanvasSystem extends System {
      mainCanvas: HTMLCanvasElement;
      canvasContext: CanvasRenderingContext2D;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Render/System/MainCameraInitSystem' {
  import { System, SystemQueries } from "ecsy-wd";
  /**
   * This system replace all MainCameraInitTag to MainCameraTag.
   */
  export class MainCameraInitSystem extends System {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Render/TagComponent/CameraTag' {
  import { TagComponent } from "ecsy-wd";
  export class CameraTag extends TagComponent {
  }

}
declare module 'white-dwarf/Core/Render/TagComponent/MainCameraInitTag' {
  import { TagComponent } from "ecsy-wd";
  export class MainCameraInitTag extends TagComponent {
  }

}
declare module 'white-dwarf/Core/Render/TagComponent/MainCameraTag' {
  import { TagComponent } from "ecsy-wd";
  export class MainCameraTag extends TagComponent {
  }

}
declare module 'white-dwarf/Core/Serialization/EntitySerializer' {
  import { Component } from "ecsy-wd";
  import { Entity } from "ecsy-wd";
  import { World } from "ecsy-wd";
  export interface IEntityObject {
      name: string;
      id: number;
      components: {
          [key: string]: any;
      };
  }
  export interface IComponentObject {
      type: string;
      data: any;
  }
  /**
   * This is a helper class for serializing and deserializing entities.
   */
  export class EntitySerializer {
      entityData: IEntityObject | null;
      /**
       * Serialize an entity to a JSON object.
       *
       * @param component The component to serialize.
       * @returns json object representation of the component.
       */
      static serializeComponent(component: Component<any>): IComponentObject;
      /**
       * Serialize an entity to a JSON object.
       *
       * @param entity The entity to serialize.
       * @returns json object representation of the entity.
       */
      static serializeEntity(entity: Entity): IEntityObject;
      /**
       * Add new entity to world from entity data.
       *
       * @param entityData The entity data to add.
       * @param reserveId Whether to reserve the id of the entity, defaults to false.
       */
      static deserializeEntity(world: World, entityData: IEntityObject, reserveId?: boolean): Entity | null;
  }

}
declare module 'white-dwarf/Core/Serialization/WorldSerializer' {
  import { World } from "ecsy-wd";
  import { IEntityObject } from "white-dwarf/Core/Serialization/EntitySerializer";
  export interface IWorldObject {
      entities: IEntityObject[];
  }
  /**
   * This is a helper class for serializing and deserializing worlds.
   */
  export class WorldSerializer {
      /**
       * Serialize a world to a JSON object.
       *
       * @param world The world to serialize.
       * @returns IWorldObject containing all the serialized entities.
       */
      static serializeWorld(world: World): IWorldObject;
      static deserializeWorld(world: World, worldObject: IWorldObject): void;
  }

}
declare module 'white-dwarf/Editor/EditorContext' {
  import { Entity } from "ecsy-wd";
  export enum EditorControl {
      View = 0,
      Move = 1
  }
  export interface IEditorUIContext {
      entityLists: HTMLCollectionOf<HTMLDivElement> | null;
      entityInspector: HTMLCollectionOf<HTMLDivElement> | null;
      playButton: HTMLButtonElement | null;
      entityNameInput: HTMLInputElement | null;
      createEntityButton: HTMLButtonElement | null;
      deserializeEntityButton: HTMLInputElement | null;
      saveWorldButton: HTMLButtonElement | null;
      loadWorldButton: HTMLButtonElement | null;
      editorModeDropdown: HTMLSelectElement | null;
  }
  export interface IEditorEventContext {
      onEntitySelected: Array<(entity: Entity) => void>;
  }
  export interface IEditorControlContext {
      controlMode: EditorControl;
  }
  export const editorUIContext: IEditorUIContext;
  export const editorEventContext: IEditorEventContext;
  export const editorControlContext: IEditorControlContext;

}
declare module 'white-dwarf/Editor/EditorEntityListManager' {
  import { Entity } from "ecsy-wd";
  export const updateEntityList: (entities: Array<Entity>) => void;
  export const addNewEntity: (entityName?: string) => void;

}
declare module 'white-dwarf/Editor/EditorSystem2DRegister' {
  import { IWorldRegister } from "white-dwarf/Utils/IWorldRegister";
  export class EditorSystem2DRegister {
      mainCanvas: HTMLCanvasElement;
      constructor(mainCanvas: HTMLCanvasElement);
      register: IWorldRegister;
  }

}
declare module 'white-dwarf/Editor/EditorSystem3DRegister' {
  import { IWorldRegister } from "white-dwarf/Utils/IWorldRegister";
  export class EditorSystem3DRegister {
      mainCanvas: HTMLCanvasElement;
      constructor(mainCanvas: HTMLCanvasElement);
      register: IWorldRegister;
  }

}
declare module 'white-dwarf/Editor/index' {
  export const editorInit: () => void;

}
declare module 'white-dwarf/Editor/System/EditorCamTagAppendSystem' {
  import { Attributes, System, SystemQueries } from "ecsy-wd";
  export class EditorCamTagAppendSystem extends System {
      static queries: SystemQueries;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Editor/System/EditorHermiteCurveInspector' {
  import { SystemQueries } from "ecsy-wd";
  import { Canvas2DRenderer } from "white-dwarf/Core/Render/System/Canvas2DRenderer";
  export class EditorHermiteCurveInspector extends Canvas2DRenderer {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Editor/System/EditorInspectorSystem' {
  import { Entity } from "ecsy-wd";
  export const updateEntityInspector: (entity: Entity | null) => void;
  export const displayEntityInspector: (entity: Entity | null) => void;

}
declare module 'white-dwarf/Editor/System/EditorViewPort2DSystems' {
  import { Entity } from "ecsy-wd";
  import { Attributes, SystemQueries } from "ecsy-wd";
  import { mat3, vec2 } from "gl-matrix";
  import { TransformData2D } from "white-dwarf/Core/Locomotion/DataComponent/TransformData2D";
  import { Canvas2DRenderer } from "white-dwarf/Core/Render/System/Canvas2DRenderer";
  export class EditorViewPort2DSystem extends Canvas2DRenderer {
      static inspectEntity: Entity | null;
      static inspectTransform: Readonly<TransformData2D> | null;
      static queries: SystemQueries;
      highlightEntity: Entity | null;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
      /**
       * Get the mouse position in screen space.
       *
       * @param event canvas mouse event.
       * @returns mouse position in screen space.
       */
      getMousePos(event: MouseEvent): vec2;
      /**
       * Convert screen space to world space.
       *
       * @param screenPos screen position.
       * @returns world position.
       */
      screenToWorld(screenPos: vec2): vec2;
      /**
       * Convert world space to screen space.
       *
       * @param worldPos world position.
       * @returns screen position.
       */
      worldToScreen(worldPos: vec2): vec2;
      drawAxis(inspectObjToCamera: mat3): void;
      drawHighlight(highlightObjToCamera: mat3): void;
  }

}
declare module 'white-dwarf/Editor/System/EditorViewPort3DSystem' {
  import { Entity } from "ecsy-wd";
  import { Attributes } from "ecsy-wd";
  import { mat4, vec2 } from "gl-matrix";
  import { TransformData3D } from "white-dwarf/Core/Locomotion/DataComponent/TransformData3D";
  import { Canvas3DRenderer } from "white-dwarf/Core/Render/System/Canvas3DRenderer";
  export class EditorViewPort3DSystem extends Canvas3DRenderer {
      static inspectEntity: Entity | null;
      static inspectTransform: TransformData3D | null;
      mousePosition: vec2;
      mouseDelta: vec2;
      mouseInCanvas: boolean;
      highlightAxis: string | null;
      movingAxis: string | null;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
      /**
       * Move the object along the axis.
       * @param axisEndPoint the end point of the axis.
       * @param startPoint the start point of the axis.
       */
      private moveAxis;
      drawAxis(objectToScreen: mat4): void;
      /**
       * Get the mouse position in screen space.
       *
       * @param event canvas mouse event.
       * @returns mouse position in screen space.
       */
      getMousePos(event: MouseEvent): vec2;
  }

}
declare module 'white-dwarf/Editor/TagComponent/EditorSceneCamTag' {
  import { TagComponent } from "ecsy-wd";
  export class EditorSceneCamTag extends TagComponent {
  }

}
declare module 'white-dwarf/Editor/TagComponent/EditorSelectedTag' {
  import { TagComponent } from "ecsy-wd";
  export class EditorSelectedTag extends TagComponent {
  }

}
declare module 'white-dwarf/Mathematics/HermiteCurveSegment' {
  import { Vector2 } from "white-dwarf/Mathematics/Vector2";
  /**
   * Get the u*B value of a hermite curve.
   *
   * @param u the parametric value passed in for base matrix.
   * @returns a 4x1 matrix as u*B.
   */
  export const hermiteBaseFunc: (u: number) => Array<number>;
  export const hermiteDerivativeBaseFunc: (u: number) => Array<number>;
  export const hermiteCurve2DSegmentEvaluate: (segment: HermiteCurve2DSegment, u: number, baseFunc?: (u: number) => Array<number>) => Vector2;
  export class HermiteCurve2DSegment {
      p0: Vector2;
      d0: Vector2;
      p1: Vector2;
      d1: Vector2;
      constructor(p0: Vector2, d0: Vector2, p1: Vector2, d1: Vector2);
      set(p0: Vector2, d0: Vector2, p1: Vector2, d1: Vector2): void;
      copy(h: HermiteCurve2DSegment): HermiteCurve2DSegment;
      clone(): HermiteCurve2DSegment;
  }
  export const HermiteCurveSegmentType: import("ecsy-wd").PropType<HermiteCurve2DSegment, HermiteCurve2DSegment>;
  export const HermiteCurve2DSegmentCustomEditor: (value: HermiteCurve2DSegment, onChange: (value: HermiteCurve2DSegment) => void) => HTMLDivElement;

}
declare module 'white-dwarf/Mathematics/LineFrame3DSegment' {
  import { Vector3 } from "white-dwarf/Mathematics/Vector3";
  export class LineFrame3DSegment {
      p0: Vector3;
      p1: Vector3;
      constructor(p0: Vector3, p1: Vector3);
      set(p0: Vector3, p1: Vector3): void;
      copy(h: LineFrame3DSegment): LineFrame3DSegment;
      clone(): LineFrame3DSegment;
  }
  export const LineFrame3DSegmentType: import("ecsy-wd").PropType<LineFrame3DSegment, LineFrame3DSegment>;
  export const LineFrame3DSegmentEditor: (segment: LineFrame3DSegment, onChange: (segment: LineFrame3DSegment) => void) => HTMLElement;

}
declare module 'white-dwarf/Mathematics/Quaternion' {
  import { quat } from "gl-matrix";
  export class Quaternion {
      value: quat;
      constructor(x: number, y: number, z: number, w: number);
      set(x: number, y: number, z: number, w: number): void;
      copy(q: Quaternion): Quaternion;
      clone(): Quaternion;
  }
  export const QuaternionType: import("ecsy-wd").PropType<Quaternion, Quaternion>;
  export const QuaternionCustomEditor: (value: Quaternion, onChange: (value: Quaternion) => void) => [HTMLDivElement, (v: Quaternion) => void];

}
declare module 'white-dwarf/Mathematics/Vector2' {
  import { vec2 } from "gl-matrix";
  /**
   * Wrapper for glmatrix vec2.
   *
   * @export
   * @class Vector2
   */
  export class Vector2 {
      value: vec2;
      /**
       * Creates an instance of Vector2.
       * @param {number} x the x component of the vector.
       * @param {number} y the y component of the vector.
       * @memberof Vector2
       */
      constructor(x: number, y: number);
      set(x: number, y: number): void;
      copy(v: Vector2): Vector2;
      clone(): Vector2;
  }
  export const Vector2Type: import("ecsy-wd").PropType<Vector2, Vector2>;
  export const Vector2CustomEditor: (value: Vector2, onChange: (value: Vector2) => void) => [HTMLDivElement, (v: Vector2) => void];

}
declare module 'white-dwarf/Mathematics/Vector3' {
  import { vec3 } from "gl-matrix";
  export class Vector3 {
      value: vec3;
      constructor(x: number, y: number, z: number);
      set(x: number, y: number, z: number): void;
      copy(v: Vector3): Vector3;
      clone(): Vector3;
  }
  export const Vector3Type: import("ecsy-wd").PropType<Vector3, Vector3>;
  export const Vector3CustomEditor: (value: Vector3, onChange: (value: Vector3) => void) => [HTMLDivElement, (v: Vector3) => void];

}
declare module 'white-dwarf/Utils/IWorldRegister' {
  import { World } from "ecsy-wd";
  export interface IWorldRegister {
      /**
       * Register all components to the world.
       *
       * @param {World} world
       * @memberof IComponentRegister
       */
      (world: World): void;
  }

}
declare module 'white-dwarf/Utils/System/Cam2DDragSystem' {
  import { Attributes, System, SystemQueries } from "ecsy-wd";
  import { Vector2 } from "white-dwarf/Mathematics/Vector2";
  /**
   * This system enables right click drag to move the camera around the scene.
   */
  export class Cam2DDragSystem extends System {
      static queries: SystemQueries;
      mainCanvas: HTMLCanvasElement;
      canvasContext: CanvasRenderingContext2D;
      deltaPos: Vector2;
      zoom: number;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Utils/System/Cam3DDragSystem' {
  import { Attributes, System, SystemQueries } from "ecsy-wd";
  import { Vector2 } from "white-dwarf/Mathematics/Vector2";
  import { Vector3 } from "white-dwarf/Mathematics/Vector3";
  export class Cam3DDragSystem extends System {
      static queries: SystemQueries;
      mainCanvas: HTMLCanvasElement;
      canvasContext: CanvasRenderingContext2D;
      deltaRot: Vector2;
      deltaPos: Vector3;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Utils/System/Object3DSelectSystem' {
  import { Entity } from "ecsy-wd";
  import { Attributes, SystemQueries } from "ecsy-wd";
  import { vec2 } from "gl-matrix";
  import { Canvas3DRenderer } from "white-dwarf/Core/Render/System/Canvas3DRenderer";
  export class Object3DSelectSystem extends Canvas3DRenderer {
      static queries: SystemQueries;
      mousePosition: vec2;
      highlightEntity: Entity | null;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
      /**
       * Get the mouse position in screen space.
       *
       * @param event canvas mouse event.
       * @returns mouse position in screen space.
       */
      getMousePos(event: MouseEvent): vec2;
  }

}
declare module 'white-dwarf/Utils/TagComponents/SelectableObject' {
  import { TagComponent } from "ecsy-wd";
  export class SelectableObject extends TagComponent {
  }

}
declare module 'white-dwarf' {
  import main = require('white-dwarf/src/Core/index');
  export = main;
}