// src/saveToJsonFile.js

export function saveToJsonFile(nodes, edges) {
  const data = { nodes, edges };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a hidden anchor element
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "react-flow-data.json";

  // Append the anchor to the document body
  document.body.appendChild(a);

  // Programmatically click the anchor to trigger the download
  a.click();

  // Clean up by revoking the object URL and removing the anchor element
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
