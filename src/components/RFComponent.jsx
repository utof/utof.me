import { useCallback, useState, useEffect, useMemo } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  ReactFlowProvider,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "./TextUpdaterNode.jsx";
import useDimensions from "../hooks/useDimensions.jsx";
import useFocusNode from "../hooks/useFocusNode.jsx";
import { saveToJsonFile } from "../util/rfdatasaver.js";
import initialData from "../util/react-flow-data.json";
const initialNodes = initialData.nodes;
const initialEdges = initialData.edges;
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

  const handleDirection = (directionKey) => {
    const neighbours = getNbrsByHandle(selectedNode, directionKey);
    console.log(JSON.stringify("ne", neighbours));
    console.log(neighbours);
    const first_neighbour = Object.keys(neighbours)[0];
    useFocus(first_neighbour); // TODO_I avoid? - 22.05
    if (first_neighbour) {
      setSelectedNode(first_neighbour);
    }
  };

  const customActionA = () => {
    console.log("Custom action A triggered");
    reactFlowInstance.getNode(selectedNode).data.initialdimensions = {
      width: reactFlowInstance.getNode(selectedNode).width,
      height: reactFlowInstance.getNode(selectedNode).height,
    };
    console.log(nodes);
    // Add the logic for custom action A
  };

  const customActionB = () => {
    console.log("Custom action B triggered");
    // Add the logic for custom action B
  };

  const keyActionsConfig = {
    ArrowLeft: () => handleDirection("l"),
    ArrowRight: () => handleDirection("r"),
    ArrowUp: () => handleDirection("t"),
    ArrowDown: () => handleDirection("b"),
    1: () => customActionA(), // Example user-defined action
    2: () => customActionB(), // Another user-defined action
    // Users can add more keys and actions here
  };

  const handleKeyActions = (keyActions = keyActionsConfig) => {
    const handleKeyDown = (event) => {
      const action = keyActions[event.key];
      if (action) {
        event.preventDefault();
        action();
      }
    };

    // Example custom actions

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  };

  // Inside your component
  useEffect(() => {
    const cleanup = handleKeyActions();
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
          const updatedNodes = [...nds, newNode];
          // saveToJsonFile(updatedNodes, edges);
          return updatedNodes;
        });
      } else {
        window.clickTime = Date.now();
        // console.log(event);
      }
    },
    [reactFlowInstance]
  );
  let prevNode = "0";
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node.id);
    // remember the previous node and if its the same then dont do anything
    if (prevNode === node.id) {
      console.log("same node clicked again");
    } else {
      // useFocus(node.id); // pan_to_node
      prevNode = node.id;
    }
  }, []);

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
          onNodeClick={onNodeClick}
          onInit={setReactFlowInstance} // TODO  check docs but how do i make it equal setReactFlowInstance but run a sideeffect?
          defaultViewport={defaultViewport}
          zoomOnScroll={false}
          zoomActivationKeyCode={"Control"}
          zoomOnDoubleClick={false}
          style={rfStyle}
          connectionMode="loose"
        >
          <Panel>
            <button onClick={() => saveToJsonFile(nodes, edges)}>Save</button>
          </Panel>
        </ReactFlow>
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

// const initialNodes = [
//   {
//     id: "0",
//     type: "textUpdater",
//     position: { x: 0, y: 0 },
//     data: { value: 0 },
//     selected: false,
//   },
//   {
//     id: "1",
//     type: "textUpdater",
//     position: { x: -1000, y: 0 },
//     data: { value: 1 },
//   },
//   {
//     id: "2",
//     type: "textUpdater",
//     position: { x: 1000, y: 0 },
//     data: { value: 2 },
//   },
//   {
//     id: "3",
//     type: "textUpdater",
//     position: { x: 0, y: -1000 },
//     data: { value: 3 },
//   },
//   {
//     id: "4",
//     type: "textUpdater",
//     position: { x: 0, y: 1000 },
//     data: { value: 4 },
//   },
// ];

// const initialEdges = [
//   {
//     id: "edge-0-1",
//     source: "0",
//     target: "1",
//     sourceHandle: "l",
//     targetHandle: "r",
//   },
//   {
//     id: "edge-0-2",
//     source: "0",
//     target: "2",
//     sourceHandle: "r",
//     targetHandle: "l",
//   },
//   {
//     id: "edge-0-3",
//     source: "0",
//     target: "3",
//     sourceHandle: "t",
//     targetHandle: "b",
//   },
//   {
//     id: "edge-0-4",
//     source: "0",
//     target: "4",
//     // animated: true,
//     sourceHandle: "b",
//     targetHandle: "t",
//   },
// ];
const centerNode = initialNodes.find((node) => node.id === "0");
