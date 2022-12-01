import { Component, ComponentSchema, COMPONENT_CHANGE_EVENT } from "ecsy-wd";
import { Types } from "ecsy-wd";
import {
  LineFrame3DSegment,
  LineFrame3DSegmentEditor,
} from "../../../Mathematics/LineFrame3DSegment";
import { Vector3 } from "../../../Mathematics/Vector3";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class LineFrameRenderData3D extends Component<LineFrameRenderData3D> {
  static schema: ComponentSchema = {
    color: {
      type: Types.String,
      default: "black",
    },
    segments: {
      type: Types.Array,
      default: [],
    },
  };

  public color: string = "black";
  public segments: LineFrame3DSegment[] = [];

  public useDefaultInspector = false;
  public onInspector = (componentDiv: HTMLDivElement) => {
    const colorDiv = document.createElement("div");
    colorDiv.style.display = "flex";
    colorDiv.style.flexDirection = "row";

    const colorLabel = document.createElement("label");
    colorLabel.appendChild(document.createTextNode("Color: "));
    colorDiv.appendChild(colorLabel);

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = this.color;
    colorInput.style.flexGrow = "1";
    colorInput.onchange = () => {
      this.color = colorInput.value;
      this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
    };
    colorDiv.appendChild(colorInput);

    componentDiv.appendChild(colorDiv);

    const curveSegmentsDiv = document.createElement("div");
    curveSegmentsDiv.style.display = "flex";
    curveSegmentsDiv.style.flexDirection = "column";

    this.populateSegmentEditor(curveSegmentsDiv);
    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, (component) => {
      this.RepopulateCurveUI(curveSegmentsDiv);
    });

    componentDiv.appendChild(curveSegmentsDiv);

    const addCurveSegmentButton = document.createElement("button");
    addCurveSegmentButton.innerText = "Add Curve Segment";
    addCurveSegmentButton.onclick = () => {
      this.segments.push(
        new LineFrame3DSegment(new Vector3(0, 0, 0), new Vector3(0, 0, 0))
      );

      this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
    };
    componentDiv.appendChild(addCurveSegmentButton);
  };

  private RepopulateCurveUI(curveSegmentsDiv: HTMLDivElement) {
    curveSegmentsDiv.innerHTML = "";

    // Populate segment editor.
    this.populateSegmentEditor(curveSegmentsDiv);
  }

  private populateSegmentEditor(curveSegmentsDiv: HTMLDivElement) {
    this.segments.forEach((segment, index) => {
      // Segment div.
      const segmentDiv = document.createElement("div");
      segmentDiv.style.display = "flex";
      segmentDiv.style.flexDirection = "column";
      segmentDiv.style.border = "1px solid black";

      // Segment header.
      segmentDiv.appendChild(document.createTextNode(`Segment ${index}`));

      // Segment editor.
      const segmentEditor = LineFrame3DSegmentEditor(segment, (value) => {
        this.segments[index] = value;
        this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
      });
      segmentDiv.appendChild(segmentEditor);

      // Remove segment button.
      const removeSegmentButton = document.createElement("button");
      removeSegmentButton.appendChild(document.createTextNode("Remove"));
      removeSegmentButton.onclick = () => {
        this.segments.splice(index, 1);
        this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
      };
      segmentDiv.appendChild(removeSegmentButton);

      // Add segment to curve.
      curveSegmentsDiv.appendChild(segmentDiv);
    });
  }
}
