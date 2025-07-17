import express from "express";
import morgan from "morgan";

export function setupMorganToken(morganInstance: typeof morgan) {
  morganInstance.token("body", (req) => {
    const r = req as express.Request;
    return r.body ? JSON.stringify(r.body) : "";
  });
}
