import { useState } from "react";
import type { ILoginResponse } from "./types/user.type";
import LoginForm from "./components/login.form";
import { IntializeUser } from "./services/login";

import Notification from "./components/notification";
import BlogList from "./components/blog-list";

export default function App() {
  const [user, setUser] = useState<ILoginResponse | null>(IntializeUser());

  function handleLogout() {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  }

  return (
    <main>
      <Notification />
      {user ? (
        <>
          <header>
            <h1>Hello, {user.name}</h1>
          </header>
          <section>
            <BlogList />

            <button onClick={handleLogout}>Logout</button>
          </section>
        </>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </main>
  );
}
