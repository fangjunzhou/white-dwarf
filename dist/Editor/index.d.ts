declare module 'white-dwarf/Core/ComponentRegistry' {
  import { Component, ComponentConstructor } from "ecsy/Component";
  export interface IComponent extends Component<IComponent> {
  }
  export namespace IComponent {
      function getImplementations(): ComponentConstructor<IComponent>[];
      function register<T extends ComponentConstructor<IComponent>>(ctor: T): T;
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
  export const coreSetup: () => void;

}
declare module 'white-dwarf/Core/index' {
  import { World } from "ecsy/World";
  import { ITimeContext } from "white-dwarf/Core/Context/TimeContext";
  export let mainWorld: World<import("submodules/ecsy/src/index")._Entity>;
  export let physicsWorld: World<import("submodules/ecsy/src/index")._Entity>;
  export const timeContext: ITimeContext;
  export const mainInit: () => void;
  export const resetWorld: () => void;

}
declare module 'white-dwarf/Core/Locomotion/DataComponent/TransformData2D' {
  import { Component, ComponentSchema } from "ecsy/Component";
  import { Vector2 } from "white-dwarf/Mathematics/Vector2";
  export class TransformData2D extends Component<TransformData2D> {
      static schema: ComponentSchema;
      position: Vector2;
      rotation: number;
      scale: Vector2;
  }

}
declare module 'white-dwarf/Core/Render/DataComponent/CameraData2D' {
  import { Component, ComponentSchema } from "ecsy/Component";
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
  import { Component, ComponentSchema } from "ecsy/Component";
  import { Vector2 } from "white-dwarf/Mathematics/Vector2";
  export class ImageRenderData2D extends Component<ImageRenderData2D> {
      static schema: ComponentSchema;
      src: string;
      img: CanvasImageSource | null;
      imageCenter: Vector2;
  }

}
declare module 'white-dwarf/Core/Render/RenderSystemRegister' {
  import { IWorldRegister } from "white-dwarf/Utils/IWorldRegister";
  export class RenderSystemRegister {
      mainCanvas: HTMLCanvasElement;
      constructor(mainCanvas: HTMLCanvasElement);
      register: IWorldRegister;
  }

}
declare module 'white-dwarf/Core/Render/System/BuildInRenderers/Canvas2DImageLoader' {
  import { System, SystemQueries } from "ecsy/System";
  export class Canvas2DImageLoader extends System {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Render/System/BuildInRenderers/Canvas2DImageRenderer' {
  import { SystemQueries } from "ecsy/System";
  import { Canvas2DRenderer } from "white-dwarf/Core/Render/System/Canvas2DRenderer";
  export class Canvas2DImageRenderer extends Canvas2DRenderer {
      static queries: SystemQueries;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Render/System/Canvas2DRenderer' {
  import { Attributes, System, SystemQueries } from "ecsy/System";
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
declare module 'white-dwarf/Core/Render/System/ClearCanvasSystem' {
  import { Attributes, System } from "ecsy/System";
  export class ClearCanvasSystem extends System {
      mainCanvas: HTMLCanvasElement;
      canvasContext: CanvasRenderingContext2D;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf/Core/Render/TagComponent/CameraTag' {
  import { TagComponent } from "ecsy/TagComponent";
  export class CameraTag extends TagComponent {
  }

}
declare module 'white-dwarf/Core/Render/TagComponent/MainCameraTag' {
  import { TagComponent } from "ecsy/TagComponent";
  export class MainCameraTag extends TagComponent {
  }

}
declare module 'white-dwarf/Editor/EditorContext' {
  import { Entity } from "ecsy/Entity";
  export interface IEditorRenderContext {
      mainCanvas: HTMLCanvasElement | null;
      mainCamera: Entity | null;
  }
  export interface IEditorUIContext {
      entityLists: HTMLCollectionOf<HTMLDivElement> | null;
      entityInspector: HTMLCollectionOf<HTMLDivElement> | null;
      playButton: HTMLButtonElement | null;
      entityNameInput: HTMLInputElement | null;
      createEntityButton: HTMLButtonElement | null;
  }
  export interface IEditorEventContext {
      onEntitySelected: Array<(entity: Entity) => void>;
  }
  export const editorRenderContext: IEditorRenderContext;
  export const editorUIContext: IEditorUIContext;
  export const editorEventContext: IEditorEventContext;

}
declare module 'white-dwarf/Editor/EditorEntityListManager' {
  import { Entity } from "ecsy/Entity";
  export const updateEntityList: (entities: Array<Entity>) => void;
  export const addNewEntity: (entityName?: string) => void;

}
declare module 'white-dwarf/Editor/EditorInitialization' {
  export const editorInitialization: () => void;
  export const setupEditorSceneCamera: () => void;

}
declare module 'white-dwarf/Editor/EditorSystemRegister' {
  import { IWorldRegister } from "white-dwarf/Utils/IWorldRegister";
  export class EditorSystemRegister {
      mainCanvas: HTMLCanvasElement;
      constructor(mainCanvas: HTMLCanvasElement);
      register: IWorldRegister;
  }

}
declare module 'white-dwarf/Editor/index' {
  export {};

}
declare module 'white-dwarf/Editor/System/EditorInspectorSystem' {
  import { Entity } from "ecsy/Entity";
  import { Attributes, SystemQueries } from "ecsy/System";
  import { vec2 } from "gl-matrix";
  import { TransformData2D } from "white-dwarf/Core/Locomotion/DataComponent/TransformData2D";
  import { Canvas2DRenderer } from "white-dwarf/Core/Render/System/Canvas2DRenderer";
  export class EditorInspectorSystem extends Canvas2DRenderer {
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
      drawAxis(): void;
      drawHighlight(): void;
      static updateEntityInspector: (entity: Entity | null) => void;
      static displayEntityInspector: (entity: Entity | null) => void;
      private static getComponentString;
  }

}
declare module 'white-dwarf/Editor/TagComponent/EditorSceneCamTag' {
  import { TagComponent } from "ecsy/TagComponent";
  export class EditorSceneCamTag extends TagComponent {
  }

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
  export const Vector2Type: import("ecsy/Types").PropType<Vector2, Vector2>;

}
declare module 'white-dwarf/Utils/IWorldRegister' {
  import { World } from "ecsy/World";
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
declare module 'white-dwarf/Utils/System/CamDragSystem' {
  import { Attributes, System, SystemQueries } from "ecsy/System";
  import { Vector2 } from "white-dwarf/Mathematics/Vector2";
  /**
   * This system enables right click drag to move the camera around the scene.
   */
  export class CamDragSystem extends System {
      static queries: SystemQueries;
      mainCanvas: HTMLCanvasElement;
      canvasContext: CanvasRenderingContext2D;
      deltaPos: Vector2;
      init(attributes?: Attributes | undefined): void;
      execute(delta: number, time: number): void;
  }

}
declare module 'white-dwarf' {
  import main = require('white-dwarf/src/Editor/index');
  export = main;
}