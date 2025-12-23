import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, onLogout, onLoginClick, currentUser }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img
            src="logo_combi.png"
            alt="Hackathon Logo"
            className="navbar-logo-img"
          />
          <div className="logo-content">
            <h2>Collaborative Robots Hackathon</h2>
            <p className="organizers">
              PSG College of Technology & Ericsson Research India
            </p>
          </div>
        </Link>

        <div className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <Link
            to="/announcements"
            className={`nav-link ${
              location.pathname === "/announcements" ? "active" : ""
            }`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">📢</span>
            Announcements
          </Link>
          <Link
            to="/selected-teams"
            className={`nav-link ${
              location.pathname === "/selected-teams" ? "active" : ""
            }`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">🏆</span>
            Selected Teams
          </Link>
          {isLoggedIn && (
            <Link
              to="/submit-proposal"
              className={`nav-link ${
                location.pathname === "/submit-proposal" ? "active" : ""
              }`}
              onClick={closeMobileMenu}
            >
              <span className="nav-icon">📝</span>
              Submit Proposal
            </Link>
          )}

          <div className="nav-auth">
            {isLoggedIn ? (
              <>
                <span className="user-name">
                  <span className="user-icon">👤</span>
                  {currentUser}
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    closeMobileMenu();
                  }}
                  className="btn btn-logout"
                >
                  <span>Logout</span>
                  <span className="logout-icon">🚪</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  closeMobileMenu();
                }}
                className="btn btn-login"
              >
                <span>Login</span>
                <span className="login-icon">🔐</span>
              </button>
            )}
          </div>
        </div>

        <div
          className={`navbar-mobile-toggle ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
