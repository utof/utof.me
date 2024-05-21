import { useCallback, useState, useEffect, useMemo } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "./TextUpdaterNode.jsx";
import useDimensions from "../hooks/useDimensions.jsx";
import useFocusNode from "../hooks/useFocusNode.jsx";
// import { getEdgesByHandle, getNbrsByHandle } from "../util/elementgetters.js";

const rfStyle = {
  backgroundColor: "#ffb8b8",
  width: "100%",
  height: "100%",
};
const nodeTypes = { textUpdater: TextUpdaterNode };

function RFNoContext() {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState("0");
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const { dimensions, divRef, isInitialized } = useDimensions();
  const useFocus = useFocusNode();

  const handleKeyDirection = () => {
    // TODO_I how to move this out of here? - 20.05
    const handleKeyDown = (event) => {
      let directionKey = null;

      switch (event.key) {
        case "ArrowLeft":
          directionKey = "l";
          break;
        case "ArrowRight":
          directionKey = "r";
          break;
        case "ArrowUp":
          directionKey = "t";
          break;
        case "ArrowDown":
          directionKey = "b";
          break;
        default:
          return;
      }
      event.preventDefault(); // Prevent the default scroll behavior on the reactFlowWrapper
      const neighbours = getNbrsByHandle(selectedNode, directionKey);
      console.log(JSON.stringify("ne", neighbours));
      console.log(neighbours);
      const first_neighbour = Object.keys(neighbours)[0]; // TODO p4 generalize to multiple nodes when multiple edges
      useFocus(first_neighbour); // TODO_I why is this bad? - 20.05
      if (first_neighbour) {
        setSelectedNode(first_neighbour);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  };

  useEffect(() => {
    const cleanup = handleKeyDirection();
    return () => cleanup();
  }, [selectedNode, edges, reactFlowInstance]); // TODO_I  why it made edges a dependency? - 20.05

  const handleWheel = (event) => {
    // console.log(event);
    if (!event.ctrlKey) {
      // Scroll the main page
      window.scrollBy(0, event.deltaY);
      // Prevent the default scroll behavior on the reactFlowWrapper
      event.preventDefault();
    }
  };

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

  const defaultViewport = useMemo(() => {
    // TODO_I get from  reactflowinstance ??? - 20.05
    return {
      x: centerNode.position.x + dimensions.width / 2 - 200 / 2, // TODO make find the dimensions of div from parents
      y: centerNode.position.y + dimensions.height / 2 - 200 / 2, // TOOD find the dims of the node
      zoom: 1,
    };
  }, [dimensions]);

  const onPaneClick = useCallback(
    (event) => {
      event.preventDefault();
      if (
        reactFlowInstance &&
        window.clickTime &&
        Date.now() - window.clickTime < 300
      ) {
        window.clickTime = null;
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        setNodes((nds) => {
          const newNode = {
            id: `${nds.length}`,
            type: "textUpdater",
            position: { x: position.x, y: position.y },
            data: { value: 123 },
          };
          return [...nds, newNode];
        });
      } else {
        console.log("edges", getEdgesByHandle(selectedNode, "b"));
        window.clickTime = Date.now();
      }
    },
    [reactFlowInstance]
  );

  const getEdgesByNode = (nodeId) => {
    // TODO_I how to move them to util/elementgetters.js ?
    const edges = reactFlowInstance.getEdges();
    const neighbours = edges.filter(
      (edge) => edge.target === nodeId || edge.source === nodeId
    );
    // return JSON.stringify(neighbours);
    return neighbours;
  };

  const getEdgesByHandle = (nodeId, handleId) => {
    const edges = getEdgesByNode(nodeId);
    const handleEdges = edges.filter(
      (edge) =>
        (edge.target === nodeId && edge.targetHandle === handleId) ||
        (edge.source === nodeId && edge.sourceHandle === handleId)
    );
    return handleEdges;
  };

  const getNbrsByHandle = (nodeId, handleId) => {
    const edges = getEdgesByHandle(nodeId, handleId);
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

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "white",
        // overflow: "scroll",
      }}
      onWheel={handleWheel}
      ref={divRef}
    >
      {isInitialized && (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onPane
          nodeTypes={nodeTypes}
          onPaneClick={onPaneClick}
          onInit={setReactFlowInstance} // TODO  check docs but how do i make it equal setReactFlowInstance but run a sideeffect?
          defaultViewport={defaultViewport}
          zoomOnScroll={false}
          zoomActivationKeyCode={"Control"}
          zoomOnDoubleClick={false}
          style={rfStyle}
          connectionMode="loose"
        />
      )}

      {/* <button onClick={() => console.log(nodes, edges)}>Log</button> */}
    </div>
  );
}

function RFComponent({ width = "100%", height = "100%" }) {
  return (
    <ReactFlowProvider>
      <RFNoContext />
      {/* <RFNoContext {...props} /> */}
    </ReactFlowProvider>
  );
}

export default RFComponent;

const initialNodes = [
  {
    id: "0",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 0 },
    selected: false,
  },
  {
    id: "1",
    type: "textUpdater",
    position: { x: -1000, y: 0 },
    data: { value: 1 },
  },
  {
    id: "2",
    type: "textUpdater",
    position: { x: 1000, y: 0 },
    data: { value: 2 },
  },
  {
    id: "3",
    type: "textUpdater",
    position: { x: 0, y: -1000 },
    data: { value: 3 },
  },
  {
    id: "4",
    type: "textUpdater",
    position: { x: 0, y: 1000 },
    data: { value: 4 },
  },
];

const initialEdges = [
  {
    id: "edge-0-1",
    source: "0",
    target: "1",
    sourceHandle: "l",
    targetHandle: "r",
  },
  {
    id: "edge-0-2",
    source: "0",
    target: "2",
    sourceHandle: "r",
    targetHandle: "l",
  },
  {
    id: "edge-0-3",
    source: "0",
    target: "3",
    sourceHandle: "t",
    targetHandle: "b",
  },
  {
    id: "edge-0-4",
    source: "0",
    target: "4",
    // animated: true,
    sourceHandle: "b",
    targetHandle: "t",
  },
];
const centerNode = initialNodes.find((node) => node.id === "0");

// export { initialNodes, initialEdges };
