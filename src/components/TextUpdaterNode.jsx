import { useCallback } from "react";
import { Handle, Position } from "reactflow";
// import { css } from "@emotion/css";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
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
