import useFocusNode from "../../../hooks/useFocusNode";
import useKeyActions from "../../../hooks/useKeyActions";
import { getNbrsByHandle } from "../util/RFUtils.js";

const useRFActions = (
  selectedNode,
  setSelectedNode,
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
    const neighbours = getNbrsByHandle(
      selectedNode,
      directionKey,
      reactFlowInstance
    );
    // console.log(selectedNode);
    // console.log("ne", neighbours.);
    const first_neighbour = Object.keys(neighbours)[0];
    console.log("first_neighbour", first_neighbour);
    useFocus(first_neighbour); // TODO_I avoid? - 22.05
    if (first_neighbour) {
      setSelectedNode(first_neighbour);
    }
  };

  const customActionA = () => {
    console.log("Custom action A triggered");
    const node = reactFlowInstance.getNode(selectedNode);
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
