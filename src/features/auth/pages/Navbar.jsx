import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";
import "../styles/navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();

  const { handleLogout, loading } = useAuth();

  useEffect(() => {
    document.body.classList.add("has-navbar");

    return () => {
      document.body.classList.remove("has-navbar");
    };
  }, []);

  const logout = async () => {
    const result = await handleLogout();

    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
          <Link to="/" className="navbar__logo">
            interview.ai
          </Link>

      <button
        className="navbar__button"
        onClick={logout}
        disabled={loading}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </nav>
  );
};

export default Navbar;