import React, { useState } from "react";
import "../css/LoginSignup.css";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [action, setAction] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [forgotSent, setForgotSent] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      action === "signup"
        ? "http://localhost:3001/api/register"
        : "http://localhost:3001/api/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      navigate("/account");
    } catch (err) {
      alert("Feil: " + err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) return alert("Skriv inn e-post først");

    try {
      const response = await fetch(
        "http://localhost:3001/api/forgot-password",
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
            <span
              onClick={handleForgotPassword}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Glemt passord?
            </span>
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
