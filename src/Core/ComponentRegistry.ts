import { Component, ComponentConstructor } from "ecsy/Component";

export interface IComponent extends Component<IComponent> {}

// Registry of all components
export namespace IComponent {
  const implementations: ComponentConstructor<IComponent>[] = [];

  export function getImplementations(): ComponentConstructor<IComponent>[] {
    return implementations;
  }

  export function register<T extends ComponentConstructor<IComponent>>(
    ctor: T
  ) {
    implementations.push(ctor);
    return ctor;
  }
}
