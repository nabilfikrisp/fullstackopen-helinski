import React, { useEffect, useState } from "react";

const Alert = ({ children, type }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "0",
        right: "0",
        background: type === "error" ? "#f43f5e" : "#14b8a6",
        width: "fit-content",
        color: "#f1f5f9",
        textAlign: "center",
        margin: "0 auto",
        borderRadius: "12px",
        display: "flex",
        padding: "10px 30px",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        fontSize: "20px",
      }}
    >
      {children}
    </div>
  );
};

export default Alert;
