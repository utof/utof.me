import { useCallback, useState, useEffect, useRef } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "./TextUpdaterNode.jsx";

import "./text-updater-node.css";

const rfStyle = {
  backgroundColor: "#B8CEFF",
  width: "100%",
  height: "100%",
};
const nodeTypes = { textUpdater: TextUpdaterNode };

function RFNoContext() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  // const reactFlow = useReactFlow();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const handleWheel = (event) => {
    console.log(event);
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

  // useEffect(() => {
  //   const mousepos = (e) => {
  //     // e.preventDefault();

  //     console.log(e.clientX, e.clientY);
  //     console.log(
  //       reactFlowInstance.screenToFlowPosition({ x: e.clientX, y: e.clientY })
  //     );
  //   };
  //   window.addEventListener("mousemove", mousepos);
  //   return () => {
  //     window.removeEventListener("mousemove", mousepos);
  //   };
  // }, []);

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
        window.clickTime = Date.now();
      }
    },
    [reactFlowInstance]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "white",
        // overflow: "scroll",
      }}
      onWheel={handleWheel}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPane
        nodeTypes={nodeTypes}
        onPaneClick={onPaneClick}
        onInit={setReactFlowInstance}
        defaultViewport={defaultViewport}
        zoomOnScroll={false}
        zoomActivationKeyCode={"Control"}
        zoomOnDoubleClick={false}
        style={rfStyle}
        connectionMode="loose"
      />

      {/* <button onClick={() => console.log(nodes, edges)}>Log</button> */}
    </div>
  );
}

function RFComponent() {
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
const defaultViewport = {
  x: centerNode.position.x,
  y: centerNode.position.y,
  zoom: 1,
};

// export { initialNodes, initialEdges };
