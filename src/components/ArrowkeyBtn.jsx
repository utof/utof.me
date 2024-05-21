// import React from "react";
function ArrowkeyBtn({ whileHover = null, whileTap = null, text = "↑" }) {
  let top = -80;
  let left = -46;
  switch (text) {
    case "↓":
      top = 0;
      left = -46;
      break;
    case "←":
      top = -38;
      left = -80;
      break;
    case "→":
      top = -38;
      left = 0;
      break;
    default:
      break;
  }

  return (
    <div
      style={{ position: "relative" }}
      // whileHover={whileHover}
      // whileTap={whileTap}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          //   transform: "translateX(50%)", // "translate(-50%, -50%)
          top: top,
          left: left,
          // right: 0,
          //   fontWeight: 900,
        }}
        className="key__button"
      >
        <div style={{ transform: "TranslateY(-4%)", scale: "1.85" }}>
          {text}
        </div>
      </div>
    </div>
  ); // scale 1.75
}

export default ArrowkeyBtn;
