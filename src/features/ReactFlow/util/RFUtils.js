const getEdgesByNode = (nodeId, reactFlowInstance) => {
  // TODO_I how to move them to util/elementgetters.js ?
  const edges = reactFlowInstance.getEdges();
  const neighbours = edges.filter(
    (edge) => edge.target === nodeId || edge.source === nodeId
  );
  // return JSON.stringify(neighbours);
  return neighbours;
};

const getEdgesByHandle = (nodeId, handleId, reactFlowInstance) => {
  const edges = getEdgesByNode(nodeId, reactFlowInstance);
  const handleEdges = edges.filter(
    (edge) =>
      (edge.target === nodeId && edge.targetHandle === handleId) ||
      (edge.source === nodeId && edge.sourceHandle === handleId)
  );
  return handleEdges;
};

const getNbrsByHandle = (nodeId, handleId, reactFlowInstance) => {
  const edges = getEdgesByHandle(nodeId, handleId, reactFlowInstance);
  const nbrs = {};

  for (const edgeId in edges) {
    const edge = edges[edgeId];
    if (edge.source === nodeId) {
      nbrs[edge.target] = edge;
    } else if (edge.target === nodeId) {
      nbrs[edge.source] = edge;
    }
  }

  return nbrs;
};

export { getEdgesByNode, getEdgesByHandle, getNbrsByHandle };
