import { createContext } from "react";

type ToastContextType = {
  message: string;
  toast: (msg: string) => void;
};

export const ToastContext = createContext<ToastContextType>({
  message: "",
  toast: () => {},
});
