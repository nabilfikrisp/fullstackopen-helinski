import { useState, type FormEvent } from "react";
import type { ILoginResponse } from "../types/user.type";
import { login } from "../services/login";
import { useToast } from "../toast/use-toast";

type LoginFormProps = {
  setUser: React.Dispatch<React.SetStateAction<ILoginResponse | null>>;
};
export default function LoginForm({ setUser }: LoginFormProps) {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await login(username, password);
      setUser(data);
      window.localStorage.setItem("loggedUser", JSON.stringify(data));
      toast(`Welcome ${data.name}!`);
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      toast("Login failed. Please check your credentials.");
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
