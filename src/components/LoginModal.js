import React, { useState } from "react";
import { TEAM_CREDENTIALS } from "../constants";
import "./LoginModal.css";

const LoginModal = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Attempting login with:", username, password);
    console.log("Available credentials:", TEAM_CREDENTIALS);
    
    const team = TEAM_CREDENTIALS.find(
      (t) => t.teamName === username && t.password === password
    );

    if (team) {
      onLogin(username);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Team Login</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-group">
            <label>Team Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., team_innovators"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your team password"
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>

        <div className="login-info">
          <p>
            <strong>Note:</strong> Use the team credentials shared via email
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
