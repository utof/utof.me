import { css } from "@emotion/css";
import React from "react";

function uText() {
  return (
    // text-ellipsis overflow-hidden
    <div
      className="text-xs m-2 text-black text-left"
      style={{ position: "relative" }}
    >
      {/* <div className={styles.overlay}></div> */}

      <h1 className="text-2xl mb-4 text-center">Hkjh flkjo</h1>
      <p className="text-m font-light mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
      </p>
      <p className="text-m font-light" style={{ wordBreak: "break-word" }}>
        The quick brown fox jumps ofver the layuz
        {/* doblasdfjklasdfjkl;adfjkls;asdfjkl;adjkl;fsasdjklf;klj;dafsklj;adfsklj;sdflk;jfdasjkl;asdflk;
        asl;lja ks;lkjasjkl;sfadkl;asd k;ljasd;ljksadfjl;ksdaf kl;sad;klj
        dsfk;jl asdklj;fasjkl; asdf;jkla dfsjkl;fsdklj;
        fsd;lkafsdklj;adfkls;jadf jkl;lkdfs;ljk;fds */}
      </p>
    </div>
  );
}

// const styles = {
//   overlay: css`
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     width: 100px;
//     height: 16px;
//     /* background: linear-gradient(to right, #ffffff3e, #ffffff); */
//     z-index: 100;
//   `,
// };

export default uText;
