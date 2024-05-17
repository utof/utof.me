import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
// import { css } from "@emotion/css";

// const handleStyle = { left: 10 };

// import "./text-updater-node.css";
import { motion } from "framer-motion";

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="text-updater-node"
      onClick={() => {
        setIsExpanded(!isExpanded);
      }}
      initial={{
        width: 200,
        height: 200,
      }}
      animate={{
        // width: isExpanded ? 400 : 200,
        // height: isExpanded ? 400 : 200,
        scale: isExpanded ? 2 : 1,
      }}
    >
      <Handle
        // type="source"
        position={Position.Top}
        id="t"
        isConnectable={isConnectable}
      />
      <div style={{}}>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Left}
        id="l"
        // style={handleStyle}
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

// const styles = css`
//   .text-updater-node {
//     height: 50px;
//     border: 1px solid #eee;
//     padding: 5px;
//     border-radius: 5px;
//     background: white;
//   }

//   .text-updater-node label {
//     display: block;
//     color: #777;
//     font-size: 12px;
//   }
// `;
