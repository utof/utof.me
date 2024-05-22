import useFocusNode from "../../../hooks/useFocusNode";
import useKeyActions from "../../../hooks/useKeyActions";
import { getNbrsByHandle } from "../util/RFUtils.js";
import { useReactFlow } from "reactflow";

const useRFActions = (
  selectedNodeId,
  setSelectedNodeId,
  reactFlowInstance,
  nodes
) => {
  const keyActionsConfig = {
    ArrowLeft: () => handleDirection("l"),
    ArrowRight: () => handleDirection("r"),
    ArrowUp: () => handleDirection("t"),
    ArrowDown: () => handleDirection("b"),
    1: () => customActionA(), // Example user-defined action
    2: () => customActionB(), // Another user-defined action
    // Users can add more keys and actions here
  };
  const useFocus = useFocusNode();
  useKeyActions(keyActionsConfig);

  const handleDirection = (directionKey) => {
    const selectedNode = reactFlowInstance.getNode(selectedNodeId);
    selectedNode.selected = false;
    const neighbours = getNbrsByHandle(
      selectedNodeId,
      directionKey,
      reactFlowInstance
    );
    // console.log(selectedNodeId);
    // console.log("ne", neighbours.);
    const first_neighbour = Object.keys(neighbours)[0];
    console.log("first_neighbour", first_neighbour);
    switch (first_neighbour) {
      case "1":
        useFocus(first_neighbour, -600);
        break;
      default:
        useFocus(first_neighbour);
        break;
    }
    if (first_neighbour) {
      setSelectedNodeId(first_neighbour);
    }
  };

  const customActionA = () => {
    console.log("Custom action A triggered");
    const node = reactFlowInstance.getNode(selectedNodeId);
    if (node) {
      node.data.initialdimensions = {
        width: node.width,
        height: node.height,
      };
      console.log(nodes);
    }
    // Add the logic for custom action A
  };

  const customActionB = () => {
    console.log("Custom action B triggered");
    // Add the logic for custom action B
  };

  return;
};

export default useRFActions;
