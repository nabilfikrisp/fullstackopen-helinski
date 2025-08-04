import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function Notification() {
  const notification = useSelector((state: RootState) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (!notification) {
    return null;
  }

  return <div style={style}>{notification}</div>;
}
