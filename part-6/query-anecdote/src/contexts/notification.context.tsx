import { createContext, useContext, useReducer } from "react";

interface NotificationState {
  message: string;
}

interface NotificationAction {
  type: "SET_NOTIFICATION" | "CLEAR_NOTIFICATION";
  payload?: string;
}

const notificationReducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { message: action.payload || "" };
    case "CLEAR_NOTIFICATION":
      return { message: "" };
    default:
      return state;
  }
};

const NotificationContext = createContext<{
  notification: NotificationState;
  setNotification: (message: string, duration?: number) => void;
  clearNotification: () => void;
} | null>(null);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, dispatch] = useReducer(notificationReducer, {
    message: "",
  });

  const setNotification = (message: string, duration = 5000) => {
    dispatch({ type: "SET_NOTIFICATION", payload: message });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, duration);
  };

  const clearNotification = () => {
    dispatch({ type: "CLEAR_NOTIFICATION" });
  };

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};
