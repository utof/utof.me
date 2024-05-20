import { useStoreApi, useReactFlow } from "reactflow";

const useFocusNode = () => {
  const store = useStoreApi();
  const { setCenter } = useReactFlow();

  const focusNode = (nodeIndex) => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);

    if (nodes.length > 0 && nodes[nodeIndex]) {
      const node = nodes[nodeIndex];

      const x = node.position.x + node.width / 2;
      const y = node.position.y + node.height / 2;

      setCenter(x, y, { duration: 1000 });
    }
  };

  return focusNode;
};

export default useFocusNode;
