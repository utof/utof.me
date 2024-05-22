import { css } from "@emotion/css";
import React from "react";

import { content } from "../features/ReactFlow/util/react-flow-data.jsx";
const containerStyles = css`
  position: relative;
  word-break: break-word;
  margin: 8px; /* Equivalent to m-2 */
  color: black; /* Equivalent to text-black */
  text-align: left; /* Equivalent to text-left */
  font-size: 12px; /* Equivalent to text-xs */

  h1 {
    font-size: 24px; /* Equivalent to text-2xl */
    margin-bottom: 16px; /* Equivalent to mb-4 */
    text-align: center;
  }

  p {
    font-size: 16px; /* Equivalent to text-m */
    font-weight: 300; /* Equivalent to font-light */
    margin-bottom: 12px; /* Equivalent to mb-3 */
    word-break: break-word;
  }
`;

function uText({ id }) {
  return <div className={containerStyles}>{content[id]}</div>;
}

export default uText;
