import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Handle, Position } from "reactflow";

import ArrowkeyBtn from "./ArrowkeyBtn.jsx";
import UText from "./UText.jsx";
import "../styles/kbbtn.css";

// TODO in the future: generalize this node.

function TextUpdaterNode({ data, isConnectable }) {
  // const store = useStoreApi();
  const divRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const scaleFactor = 2;
  const hoverFactor = 1.03;
  const dimensions = { width: 200, height: 200 }; // TODO useDimensions hook to read the size of the screen and set w n h  for this thing

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (divRef.current) {
      divRef.current.focus(); // below changing the border and radius
      // divRef.current.style.borderRadius = "1000px";
      divRef.current.style.border = "2px solid #005eff";
    }
  };

  return (
    <motion.div
      ref={divRef}
      // drag // TOOD make this work with react-flow
      className="bg-white rounded-3xl p-4 "
      // className={`bg-white rounded-3xl ${kkjhasdf ? "flex-row" : "Awsd"} p-4` }

      // onFocus={() => {
      //   setIsExpanded(true);
      // }} // TOOD weird bug
      tabIndex={-1}
      onClick={handleClick}
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
      }} // on arrowkey up make it bigger
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") {
          // handleTransitionToNode();
          setIsExpanded(true);
        }
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
