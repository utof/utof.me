import { useStoreApi, useReactFlow } from "reactflow";

const useFocusNode = () => {
  const store = useStoreApi();
  const { setCenter } = useReactFlow();

  function focusNode(
    nodeIndex,
    add_x = 0,
    add_y = 0,
    duration = 700,
    zoom = 1
  ) {
    // TODO_I why not input on the outside?
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);

    if (nodes.length > 0 && nodes[nodeIndex]) {
      const node = nodes[nodeIndex];
      node.selected = true;

      const x = node.position.x + node.width / 2;
      const y = node.position.y + node.height / 2;

      setCenter(x + add_x, y + add_y, { duration, zoom });
    }
  }

  return focusNode;
};

export default useFocusNode;
