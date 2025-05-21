import React from "react";
import "../css/LoginPrompt.css"; // Du kan style denne enkelt selv
import { useNavigate } from "react-router-dom";

const LoginPrompt = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="login-prompt-backdrop">
      <div className="login-prompt-box">
        <h3>You Need To Login</h3>
        <p>Login to use Favorites and get full access.</p>
        <div className="login-prompt-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;
