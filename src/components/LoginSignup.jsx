import React, { useState, useContext } from "react";
import "../css/LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const LoginSignup = () => {
  const [action, setAction] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [forgotSent, setForgotSent] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      action === "signup"
        ? `${import.meta.env.VITE_API_URL}/api/signup`
        : `${import.meta.env.VITE_API_URL}/api/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Request to:", endpoint);
      console.log("Payload:", formData);
      console.log("Status:", response.status);

      const data = await response.json();
      console.log("Response data:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        login(data.user);
        navigate("/account");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Feil: " + err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) return alert("Enter your email first!");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setForgotSent(true);
    } catch (error) {
      alert("Feil: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action === "login" ? "Login" : "Sign Up"}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === "signup" && (
            <div className="input">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="input">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="forgot-password">
          {forgotSent ? (
            <span>Lenke for tilbakestilling sendt til e-post.</span>
          ) : (
            <div>
              Forgot password? <span />
              <span
                onClick={handleForgotPassword}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Click Here!
              </span>
            </div>
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
