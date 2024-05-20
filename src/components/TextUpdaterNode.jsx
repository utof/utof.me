import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
// import { css } from "@emotion/css";

// const handleStyle = { left: 10 };

import "../styles/kbbtn.css";

import { motion } from "framer-motion";
import UText from "./UText.jsx";
import ArrowkeyBtn from "./ArrowkeyBtn.jsx";

function TextUpdaterNode({ data, isConnectable }) {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);
  const [isExpanded, setIsExpanded] = useState(false);
  const scaleFactor = 2;
  const hoverFactor = 1.03;
  const dimensions = { width: 200, height: 200 }; // TODO useDimensions hook to read the size of the screen and set w n h  for this thing

  return (
    <motion.div
      // drag // TOOD make this work with react-flow
      className="bg-white rounded-3xl p-4 "
      // className={`bg-white rounded-3xl ${kkjhasdf ? "flex-row" : "Awsd"} p-4` }

      // onFocus={() => {
      //   setIsExpanded(true);
      // }} // TOOD weird bug

      onClick={() => {
        setIsExpanded(!isExpanded);
      }}
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
        translateX: isExpanded ? -dimensions.width / 2 : 0,
      }}
    >
      <Handle position={Position.Top} id="t" isConnectable={isConnectable}>
        <ArrowkeyBtn />
      </Handle>

      <div
        // className="align-top"
        onClick={(e) => {
          // e.stopPropagation();
        }}
      >
        <UText />
      </div>
      <Handle
        type="source"
        position={Position.Left}
        id="l"
        isConnectable={isConnectable}
      />
      <Handle
        // type="source"
        position={Position.Right}
        id="r"
        isConnectable={isConnectable}
      />
      <Handle
        // type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </motion.div>
  );
}

export default TextUpdaterNode;

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
