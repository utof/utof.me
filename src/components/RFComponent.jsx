import { useCallback, useState, useEffect, useRef } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  // getNodesBounds,
  useStore,
  useReactFlow,
  ReactFlowProvider,
  useViewport,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "./TextUpdaterNode.jsx";

import "./text-updater-node.css";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};
const nodeTypes = { textUpdater: TextUpdaterNode };

function RFNoContext({ width = "1000px", height = "1000px" }) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  // const reactFlow = useReactFlow();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    const handleScroll = (event) => {
      if (!event.ctrlKey) {
        // Scroll the main page
        window.scrollBy(0, event.deltaY);
        // Prevent the default scroll behavior on the reactFlowWrapper
        event.preventDefault();
      }
    };

    const wrapper = reactFlowWrapper.current;
    if (wrapper) {
      wrapper.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

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
        const xPos = event.clientX;
        const yPos = event.clientY;
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }); // todo F5+react-refresh bug
        console.log(reactFlowInstance);
        console.log(xPos, yPos, "old position");
        console.log(position.x, position.y, "new position");

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
      style={{ width: width, height: height, overflow: "auto" }}
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onPaneClick={onPaneClick}
        onInit={setReactFlowInstance}
        zoomOnScroll={false}
        zoomActivationKeyCode={"Control"}
        // panOnScroll={false}
        // fitView
        zoomOnDoubleClick={false}
        style={rfStyle}
      />
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
    data: { value: 123 },
  },
  {
    id: "1",
    type: "output",
    targetPosition: "top",
    position: { x: 0, y: 200 },
    data: { label: "node 2" },
  },
  {
    id: "2",
    type: "output",
    targetPosition: "top",
    position: { x: 200, y: 200 },
    data: { label: "node 3" },
  },
];

const initialEdges = [
  { id: "edge-1", source: "node-1", target: "node-2", sourceHandle: "a" },
  { id: "edge-2", source: "node-1", target: "node-3", sourceHandle: "b" },
];
