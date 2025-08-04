import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers/anecdoteReducer.ts";

const store = createStore(reducer);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
