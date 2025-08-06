import { isAxiosError } from "axios";
import { ValidationError } from "./validation-error";

export function handleError(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message;
  }

  if (isAxiosError(error)) {
    if (error.response) {
      return error.response.data?.message || "An error occurred";
    } else if (error.request) {
      return "No response received from the server";
    } else {
      return error.message;
    }
  }

  return "An unknown error occurred";
}
