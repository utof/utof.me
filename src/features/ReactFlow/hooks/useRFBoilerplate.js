import { useCallback, useState } from "react";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";

// import initialData from "../util/react-flow-data.json";
import initialData from "../util/react-flow-data.json";

const initialNodes = initialData.nodes;
const initialEdges = initialData.edges;

function useRFBoilerplate() {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState("0");
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  return {
    reactFlowInstance,
    setReactFlowInstance,
    selectedNodeId,
    setSelectedNodeId,
    nodes,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  };
}

export default useRFBoilerplate;
