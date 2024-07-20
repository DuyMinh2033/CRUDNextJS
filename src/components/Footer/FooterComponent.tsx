"use client";
import React from "react";

const FooterComponent = () => {
  return (
    <div
      style={{
        backgroundColor: "#666",
        position: "fixed",
        right: 0,
        bottom: 0,
        left: 0,
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>Footer</div>
    </div>
  );
};

export default FooterComponent;
