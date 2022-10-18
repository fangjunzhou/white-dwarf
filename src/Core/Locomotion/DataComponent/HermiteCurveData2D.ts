import { Component, ComponentSchema } from "ecsy/Component";
import { Types } from "ecsy/Types";
import {
  HermiteCurve2DSegment,
  HermiteCurve2DSegmentCustomEditor,
} from "../../../Mathematics/HermiteCurveSegment";
import { Vector2, Vector2CustomEditor } from "../../../Mathematics/Vector2";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class HermiteCurveData2D extends Component<HermiteCurveData2D> {
  static schema: ComponentSchema = {
    segments: {
      type: Types.Array,
      default: [],
    },
    resolution: {
      type: Types.Number,
      default: 0.01,
    },
  };

  segments: HermiteCurve2DSegment[] = [];
  resolution: number = 0.01;

  useDefaultEditor = false;
  onInspector = (componentDiv: HTMLDivElement) => {
    const curveSegmentsDiv = document.createElement("div");
    curveSegmentsDiv.style.display = "flex";
    curveSegmentsDiv.style.flexDirection = "column";

    this.populateSegmentEditor(curveSegmentsDiv);

    componentDiv.appendChild(curveSegmentsDiv);

    const addCurveSegmentButton = document.createElement("button");
    addCurveSegmentButton.innerText = "Add Curve Segment";
    addCurveSegmentButton.onclick = () => {
      this.segments.push(
        new HermiteCurve2DSegment(
          new Vector2(0, 0),
          new Vector2(0, 0),
          new Vector2(0, 0),
          new Vector2(0, 0)
        )
      );

      this.onComponentChanged(this);
      this.RepopulateCurveUI(curveSegmentsDiv);
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
      const segmentEditor = HermiteCurve2DSegmentCustomEditor(
        segment,
        (value) => {
          this.segments[index] = value;
          this.onComponentChanged(this);
          this.RepopulateCurveUI(curveSegmentsDiv);
        }
      );
      segmentDiv.appendChild(segmentEditor);

      // Remove segment button.
      const removeSegmentButton = document.createElement("button");
      removeSegmentButton.appendChild(document.createTextNode("Remove"));
      removeSegmentButton.onclick = () => {
        this.segments.splice(index, 1);
        this.onComponentChanged(this);
        this.RepopulateCurveUI(curveSegmentsDiv);
      };
      segmentDiv.appendChild(removeSegmentButton);

      // Add segment to curve.
      curveSegmentsDiv.appendChild(segmentDiv);
    });
  }
}
