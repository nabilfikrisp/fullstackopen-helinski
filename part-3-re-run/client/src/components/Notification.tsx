import type { NotificationType } from "../types/notification";

type NotificationProps = {
  notification: NotificationType;
};
const Notification = ({ notification }: NotificationProps) => {
  const { message, isError } = notification;

  if (!message) {
    return null;
  }

  const style = {
    color: isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
