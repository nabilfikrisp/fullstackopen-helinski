import express from "express";
import mongoose from "mongoose";

export function errorHandler(
  error: Error,
  _request: express.Request,
  response: express.Response,
  _next: express.NextFunction
) {
  if (error instanceof mongoose.Error.ValidationError) {
    return response.status(400).json({ error: error.message });
  }

  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).json({ error: "Invalid ID" });
  }

  console.error("Unhandled error:", error);
  response.status(500).json({ error: "Internal server error" });
}

export function unknownEndpoint(request: express.Request, response: express.Response) {
  response.status(404).json({ error: "Unknown endpoint" });
}
