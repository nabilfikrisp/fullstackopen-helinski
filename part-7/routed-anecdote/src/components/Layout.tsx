import { Link, Outlet } from "react-router";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <header>
        <h1>Anecdote App</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create New</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
