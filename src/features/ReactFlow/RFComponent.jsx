import { useCallback, useMemo, useState } from "react";
import ReactFlow, { Panel, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

import useDimensions from "../../hooks/useDimensions.jsx";
import { saveToJsonFile } from "../../util/rfdatasaver.js";
import TextUpdaterNode from "./TextUpdaterNode.jsx";
import useRFActions from "./hooks/useRFActions.js";
import useRFBoilerplate from "./hooks/useRFBoilerplate.js";

// import { getEdgesByHandle, getNbrsByHandle } from "../util/elementgetters.js";

const rfStyle = {
  backgroundColor: "#ffb8b8",
  width: "100%",
  height: "100%",
};
const nodeTypes = { textUpdater: TextUpdaterNode };

function RFNoContext() {
  const {
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
  } = useRFBoilerplate();
  useRFActions(selectedNodeId, setSelectedNodeId, reactFlowInstance, nodes);
  const centerNode = useMemo(() => nodes.find((node) => node.id === "0"));

  const { dimensions, divRef, isInitialized } = useDimensions();

  const defaultViewport = useMemo(() => {
    // TODO_I get from  reactflowinstance ??? - 20.05
    return {
      x: centerNode.position.x + dimensions.width / 2 - centerNode.width / 2, // TODO make find the dimensions of div from parents
      y: centerNode.position.y + dimensions.height / 2 - centerNode.height / 2, // TOOD find the dims of the node
      zoom: 1,
    };
  }, [dimensions]);

  const createNodeAt = (x, y) => {
    const position = reactFlowInstance.screenToFlowPosition({
      x,
      y,
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
  };

  const handlePaneClick = useCallback(
    (event) => {
      event.preventDefault();
      // setSelectedNode(null);
      if (
        reactFlowInstance &&
        window.clickTime &&
        Date.now() - window.clickTime < 300
      ) {
        window.clickTime = null;
        const { clientX, clientY } = event;
        createNodeAt(clientX, clientY);
      } else {
        window.clickTime = Date.now();
        // console.log(event);
      }
    },
    [reactFlowInstance]
  );

  const handleWheel = (event) => {
    if (!event.ctrlKey) {
      // Scroll the main page
      window.scrollBy(0, event.deltaY);
    }
  };

  let prevNode = "0";
  const handleNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    console.log("node clicked", node);
    // remember the previous node and if its the same then dont do anything
    if (prevNode === node.id) {
      console.log("same node clicked again");
    } else {
      // useFocus(node.id); // pan_to_node
      prevNode = node.id;
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "white",
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
          onPaneClick={handlePaneClick}
          onNodeClick={handleNodeClick}
          onInit={setReactFlowInstance} // TODO  check docs but how do i make it equal setReactFlowInstance but run a sideeffect?
          defaultViewport={defaultViewport}
          zoomOnScroll={false}
          zoomActivationKeyCode={"Control"}
          zoomOnDoubleClick={false}
          style={rfStyle}
          connectionMode="loose"
          minZoom={0.1}
        >
          <Panel>
            <button onClick={() => saveToJsonFile(nodes, edges)}>Save</button>
          </Panel>
        </ReactFlow>
      )}
    </div>
  );
}

function RFComponent({ width = "100%", height = "100%" }) {
  return (
    <ReactFlowProvider>
      <RFNoContext />
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
// const centerNode = initialNodes.find((node) => node.id === "0");
