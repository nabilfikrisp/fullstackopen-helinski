import { useState, type ReactNode } from "react";
import { setToastFn } from "./toast";
import { ToastContext } from "./toast-context";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");

  setToastFn((msg: string) => setMessage(msg));

  return (
    <ToastContext.Provider value={{ message, toast: setMessage }}>
      {children}
    </ToastContext.Provider>
  );
}
