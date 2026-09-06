import { ReactComponentTreeDiagram } from "./ReactComponentTreeDiagram";
import { ReactPropsDiagram } from "./ReactPropsDiagram";
import { ReactStateDiagram } from "./ReactStateDiagram";
import { ReactLifecycleDiagram } from "./ReactLifecycleDiagram";
import { ReactContextDiagram } from "./ReactContextDiagram";
import { ReactFormValidationDiagram } from "./ReactFormValidationDiagram";
import { ReactUseEffectDiagram } from "./ReactUseEffectDiagram";

export function ReactDiagram({ name }: { name: string }) {
  switch (name) {
    case "ComponentTree":
      return <ReactComponentTreeDiagram />;
    case "PropsFlow":
      return <ReactPropsDiagram />;
    case "StateRender":
      return <ReactStateDiagram />;
    case "Lifecycle":
      return <ReactLifecycleDiagram />;
    case "ContextAPI":
      return <ReactContextDiagram />;
    case "FormValidation":
      return <ReactFormValidationDiagram />;
    case "UseEffect":
      return <ReactUseEffectDiagram />;
    default:
      return <div className="p-4 border border-red-500 bg-red-50 text-red-700">Unknown React diagram: {name}</div>;
  }
}
