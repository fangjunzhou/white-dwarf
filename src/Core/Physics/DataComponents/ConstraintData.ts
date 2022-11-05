import { Component, ComponentSchema } from "ecsy/Component";
import { Entity } from "ecsy/Entity";
import { Types } from "ecsy/Types";
import { IComponent } from "../../ComponentRegistry";

export class Constraint {
  target!: Entity;
  length!: number;

  constructor(target: Entity, length: number) {
    this.target = target;
    this.length = length;
  }
}

@IComponent.register
export class ConstraintData extends Component<ConstraintData> {
  static schema: ComponentSchema = {
    constraints: {
      type: Types.Ref,
      default: [],
    },
  };
  constraints!: Array<Constraint>;
}
