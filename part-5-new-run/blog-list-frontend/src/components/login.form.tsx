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
    } catch (error) {
      console.error("Login failed:", error);
      toast("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} autoComplete="on">
      <div>
        <label htmlFor="login-username">Username</label>
        <input
          id="login-username"
          type="text"
          value={username}
          name="username"
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          name="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
