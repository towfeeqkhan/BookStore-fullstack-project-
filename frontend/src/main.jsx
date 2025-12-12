import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BookDataProvider } from "./context/BookDataProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BookDataProvider>
      <App />
    </BookDataProvider>
  </StrictMode>
);
