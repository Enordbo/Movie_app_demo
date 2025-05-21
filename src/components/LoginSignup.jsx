import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import "../css/LoginSignup.css";

import user_icon from "./assets/person.png";
import email_icon from "./assets/email.png";
import password_icon from "./assets/password.png";

const LoginSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const redirectFrom = location.state?.from?.pathname || "/account";
  const cameFromProtectedRoute = !!location.state?.from;

  const [action, setAction] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [forgotSent, setForgotSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = action === "login" ? "/api/login" : "/api/signup";

    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      if (action === "login") {
        localStorage.setItem("token", data.token);
        login(data.user);
        navigate(redirectFrom);
      }

      alert(data.message);
    } catch (error) {
      alert("Feil: " + error.message);
    }
  };


  const handleForgotPassword = async () => {
    if (!formData.email) return alert("Skriv inn e-post først");

    try {
      const response = await fetch("http://localhost:3001/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setForgotSent(true);
    } catch (err) {
      alert("Feil: " + err.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action === "login" ? "Login" : "Sign Up"}</div>
        <div className="underline"></div>
      </div>

      {cameFromProtectedRoute && (
        <p className="info-message">You need to login to access all features.</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === "signup" && (
            <div className="input">
              <img src={user_icon} alt="Username" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="input">
            <img src={email_icon} alt="email" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="password" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="forgot-password">
          {forgotSent ? (
            <span>Password reset is sent to your Email.</span>
          ) : (
            <div>Forgot Password? <span/>
            <span onClick={handleForgotPassword} style={{ cursor: "pointer", color: "blue" }}>
              click Here!
            </span></div>
          )}
        </div>

        <div className="submit-container">
          <button type="submit" className="submit">
            {action === "login" ? "Login" : "Sign Up"}
          </button>
          <button
            type="button"
            className="submit gray"
            onClick={() => setAction(action === "login" ? "signup" : "login")}
          >
            {action === "login" ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
