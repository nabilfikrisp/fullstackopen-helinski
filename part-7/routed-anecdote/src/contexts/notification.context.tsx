import { createContext, useContext, useState, type ReactNode } from "react";

type NotificationContextProps = {
  notification: string;
  showNotification: (message: string, duration?: number) => void;
  clearNotification: () => void;
};

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState("");

  const showNotification = (message: string, duration = 5000) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, duration);
  };

  const clearNotification = () => {
    setNotification("");
  };

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
