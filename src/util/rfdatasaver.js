import { saveAs } from "file-saver";

export function saveToJsonFile(nodes, edges) {
  const data = { nodes, edges };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "react-flow-data.json");
}
