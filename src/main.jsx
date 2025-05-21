import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LoginPromptProvider } from "./contexts/LoginPromptContext.jsx"; // ← denne må være med
import { MovieContextProvider } from "./contexts/MovieContexts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoginPromptProvider>
          <MovieContextProvider>
            <App />
          </MovieContextProvider>
        </LoginPromptProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
