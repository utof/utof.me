import { useReactFlow } from "reactflow";
// const reactFlowInstance = useReactFlow();
// export const getEdgesByNode = (nodeId) => {
//   const edges = reactFlowInstance.getEdges();
//   const neighbours = edges.filter(
//     (edge) => edge.target === nodeId || edge.source === nodeId
//   );
//   // return JSON.stringify(neighbours);
//   return neighbours;
// };

// export const getEdgesByHandle = (nodeId, handleId) => {
//   const edges = getEdgesByNode(nodeId);
//   const handleEdges = edges.filter(
//     (edge) =>
//       (edge.target === nodeId && edge.targetHandle === handleId) ||
//       (edge.source === nodeId && edge.sourceHandle === handleId)
//   );
//   return handleEdges;
// };

// export const getNbrsByHandle = (nodeId, handleId) => {
//   const edges = getEdgesByHandle(nodeId, handleId);
//   const nbrs = {};

//   for (const edgeId in edges) {
//     const edge = edges[edgeId];
//     if (edge.source === nodeId) {
//       nbrs[edge.target] = edge;
//     } else if (edge.target === nodeId) {
//       nbrs[edge.source] = edge;
//     }
//   }

//   return nbrs;
// };
