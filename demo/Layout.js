import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <div
        style={{
          backgroundColor: "rgba(47, 47, 47, 0.98)",
          width: "100%",
          height: "56px",
          lineHeight: "56px"
        }}
      >
        <div style={{ color: "#fff", paddingLeft: 20 }}>image cropper</div>
      </div>
      {children}
    </div>
  );
}
