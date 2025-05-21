import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx"; // sørg for riktig path

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        {user ? (
          <>
            <Link to="/favorites" className="nav-link">
              Favorites
            </Link>
            <Link to="/account" className="nav-link">
              {user.name}
            </Link>

            <button onClick={logout} className="nav-link">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
