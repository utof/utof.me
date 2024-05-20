// import React from "react";
function ArrowkeyBtn(whileHover = null, whileTap = null) {
  return (
    <div
      style={{ position: "relative" }}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          //   transform: "translateX(50%)", // "translate(-50%, -50%)
          top: -80,
          left: -46,
          // right: 0,
          //   fontWeight: 900,
        }}
        className="key__button"
      >
        <div style={{ transform: "TranslateY(-4%)", scale: "1.75" }}>↑</div>
      </div>
    </div>
  );
}

export default ArrowkeyBtn;
