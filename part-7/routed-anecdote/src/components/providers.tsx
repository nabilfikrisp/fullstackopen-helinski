import { AnecdoteProvider } from "../contexts/anecdote.context";
import { NotificationProvider } from "../contexts/notification.context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnecdoteProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </AnecdoteProvider>
  );
}
