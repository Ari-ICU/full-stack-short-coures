import { GitArchitectureDiagram } from "./GitArchitectureDiagram";
import { GitBranchingDiagram } from "./GitBranchingDiagram";
import { GitRemoteDiagram } from "./GitRemoteDiagram";

export function GitDiagram({ name }: { name: string }) {
  switch (name) {
    case "Architecture":
      return <GitArchitectureDiagram />;
    case "Branching":
      return <GitBranchingDiagram />;
    case "Remote":
      return <GitRemoteDiagram />;
    default:
      return <div className="p-4 border border-red-500 bg-red-50 text-red-700">Unknown Git diagram: {name}</div>;
  }
}
