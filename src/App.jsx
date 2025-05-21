import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import NavBar from "./components/NavBar";
import Favorites from "./pages/Favorites";
import { useLoginPrompt } from "./contexts/LoginPromptContext";
import LoginPrompt from "./components/LoginPrompt";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  const { showPrompt, setShowPrompt } = useLoginPrompt();

  return (
    <>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
        </Routes>

      {showPrompt && <LoginPrompt onClose={() => setShowPrompt(false)} />}
    </>
  );
};

export default App;
