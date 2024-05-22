import "./App.css";
import RFcomponent from "./features/ReactFlow/RFComponent.jsx";
import { motion } from "framer-motion";
import { css } from "@emotion/css";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "lightpink",
        // display: "flex",
        // alignItems: "s",
        // justifyContent: "space-around",
      }}
    >
      <RFcomponent />
      <div className="text-3xl font-thin"> aaaaa </div>
    </div>
  );
}

export default App;

// const styles = {
//   froggy: css`
//     display: flex;
//     /* justify-content: space-  evenly; */
//     /* align-items: center; */
//     align-content: flex-start;
//     background: lightblue;
//     width: 90%;
//     height: 90%;
//   `,
//   froggy2: css`
//     width: 100px;
//     height: 100px;
//     background: green;
//     margin: 10px;
//   `,
// };
