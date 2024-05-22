import { motion } from "framer-motion";
import { useState, useRef, memo, useEffect } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  NodeResizer,
  NodeToolbar,
  NodeResizeControl,
} from "reactflow";

import ArrowkeyBtn from "./ArrowkeyBtn.jsx";
import UText from "../../components/UText.jsx";
import "../../styles/kbbtn.css";

// TODO in the future: generalize this node

function TextUpdaterNode({
  id,
  isConnectable,
  selected,
  width = 200,
  height = 200,
  data,
}) {
  // const store = useStoreApi();
  const [startedDragging, setStartedDragging] = useState(false);
  const { setCenter } = useReactFlow(); // TODO_I gotta put elementgetters b4 this - 21.05
  const divRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const scaleFactor = 2;
  const hoverFactor = 1.03;
  const dimensions = { width, height }; // TODO useDimensions hook to read the size of the screen and set w n h  for this thing

  // const { width, height } = data.initialdimensions;
  // const _disableAnimations = false;

  // const handleClick = () => {
  //   // setIsExpanded(!isExpanded);
  //   if (divRef.current) {
  //     // divRef.current.focus();
  //     divRef.current.style.border = "2px solid #005eff";
  //     if (selected) {
  //       divRef.current.style.border = "2px solid #ff0071";}
  //   }
  // };

  return (
    <>
      <NodeResizeControl // TODO p3 use NodeResizeControl instead of NodeResizer
        color="#ff0071"
        isVisible={selected}
        // isVisible={true}
        // handleStyle={{ width: 300, height: 300 }}
        minWidth={100}
        minHeight={100}
        style={{ width: 10, height: 10 }}
        onResize={() => {
          if (!startedDragging) {
            setStartedDragging(true);
          }
        }}
        // style={{ width: 100, height: 100 }}
      />
      <NodeToolbar isVisible={selected} position={Position.Top}>
        <ArrowkeyBtn text="↑" />
      </NodeToolbar>
      <NodeToolbar isVisible={selected} position={Position.Left}>
        <ArrowkeyBtn text="←" />
      </NodeToolbar>
      <NodeToolbar isVisible={selected} position={Position.Right}>
        <ArrowkeyBtn text="→" />
      </NodeToolbar>
      <NodeToolbar isVisible={selected} position={Position.Bottom}>
        <ArrowkeyBtn text="↓" />
      </NodeToolbar>
      <div
        ref={divRef} // TODO_I stop fucking screaming at me for using ref inside motion.div (check console)
        style={
          !startedDragging
            ? {
                width: dimensions.width,
                height: dimensions.height,
                overflow: "hidden",
              }
            : { width: "100%", height: "100%", overflow: "hidden" }
        }
        // style={{width: dimensions.width, height: dimensions.height, overflow: "hidden"}}
        // drag // TOOD make this work with react-flow
        className="bg-white rounded-3xl p-4 "
        // className={`bg-white rounded-3xl ${kkjhasdf ? "flex-row" : "Awsd"} p-4` }

        // onFocus={() => {
        //   setIsExpanded(true);
        // }} // TOOD weird bug

        // onClick={handleClick}
        // whileInView={{ scale: 1.2 }}
        whileHover={{
          scale: isExpanded ? scaleFactor * hoverFactor : hoverFactor,
          // transition: { duration: 0.2, ease: "easeIn" },
        }}
        // onHoverEnd={{ scale: hoverFactor, transition: { duration: 0.2 } }}
        whileTap={{
          scale: isExpanded
            ? scaleFactor * hoverFactor + 0.02
            : 0.9 - (1 - hoverFactor),
        }}
        initial={{
          width: dimensions.width,
          height: dimensions.height,
        }}
        animate={{
          scale: isExpanded ? scaleFactor : 1,
          width: isExpanded ? 400 : dimensions.width,
          translateX: isExpanded ? -dimensions.width / 2 : 0, // use translate(-50%, -50%) instead
        }}
      >
        <Handle position={Position.Top} id="t" isConnectable={isConnectable}>
          {/* <ArrowkeyBtn /> */}
        </Handle>

        <div
          // className="align-top"
          onClick={(e) => {
            // e.stopPropagation();
          }}
        >
          <UText id={id} />
        </div>
        <Handle
          type="source"
          position={Position.Left}
          id="l"
          isConnectable={isConnectable}
        >
          {/* <ArrowkeyBtn text="←" /> */}
        </Handle>
        <Handle
          // type="source"
          position={Position.Right}
          id="r"
          isConnectable={isConnectable}
        >
          {/* <ArrowkeyBtn text="→" /> */}
        </Handle>
        <Handle
          // type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={isConnectable}
        >
          {/* <ArrowkeyBtn text="↓" /> */}
        </Handle>
      </div>
    </>
  );
}

export default memo(TextUpdaterNode);

// const styles =
//   text-updater-node
//     height: 50px;
//     border: 1px solid #eee;
//     padding: 5px;
//     border-radius: 5px;
//     background: white;
//

//   .text-updater-node label {
//     display: block;
//     color: #777;
//     font-size: 12px;
//   }
// `;
