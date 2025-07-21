import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";

export function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof mongoose.Error.ValidationError) {
    return response.status(400).json({ error: error.message });
  }

  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).json({ error: "Invalid ID" });
  }

  if (error instanceof MongoServerError && error.code === 11000) {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  }

  if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  console.error("Unhandled error:", error);
  return response.status(500).json({ error: "Internal server error" });
}

export function unknownEndpoint(request: Request, response: Response) {
  return response.status(404).json({ error: "Unknown endpoint" });
}
