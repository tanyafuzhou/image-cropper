import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <div
        style={{
          backgroundColor: "rgba(47, 47, 47, 0.98)",
          width: "100%",
          height: "56px",
          lineHeight: "56px",
          padding: "0 20px"
        }}
      >
        <div style={{ color: "#fff", float: "left" }}>Image Cropper</div>
        <a
          href="https://github.com/tanyafuzhou/image-cropper"
          style={{ color: "#ddd", float: "right" }}
        >
          github
        </a>
      </div>
      {children}
      <div
        style={{
          borderTop: "1px solid #e5e5e5",
          textAlign: "center",
          color: "#ddd",
          fontSize: 14,
          paddingTop: 20
        }}
      >
        Image Cropper powered by tanyafuzhou
      </div>
    </div>
  );
}
