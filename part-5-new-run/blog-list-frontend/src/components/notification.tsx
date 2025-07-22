import { useEffect, useState, useContext } from "react";
import { ToastContext } from "../toast/toast-context";

export default function Notification() {
  const { message } = useContext(ToastContext);
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [message]);

  if (!visible || !message) return null;

  return <div style={{ fontWeight: "bold" }}>{message}</div>;
}
