import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout.tsx";
import HomePage from "./pages/home.page.tsx";
import CreateNewPage from "./pages/create-new.page.tsx";
import AboutPage from "./pages/about.page.tsx";
import AnecdoteDetailPage from "./pages/anecdote-detail.page.tsx";
import Providers from "./components/providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="create" element={<CreateNewPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route
              path="anecdotes/:anecdoteId"
              element={<AnecdoteDetailPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  </StrictMode>
);
