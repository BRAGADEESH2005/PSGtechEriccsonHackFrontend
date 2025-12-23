import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Announcements from "./pages/Announcements";
import SelectedTeams from "./pages/SelectedTeams";
import SubmitProposal from "./pages/SubmitProposal";
import AdminPanel from "./pages/AdminPanel";
import LoginModal from "./components/LoginModal";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("hackathon_user");
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      checkProposalStatus(user);
    }
  }, []);

  const checkProposalStatus = async (teamName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/proposals/check/${teamName}`
      );
      const data = await response.json();
      console.log("Proposal status for", teamName, ":", data);
      setProposalSubmitted(data.submitted);
    } catch (error) {
      console.error("Error checking proposal status:", error);
    }
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    localStorage.setItem("hackathon_user", username);
    setShowLoginModal(false);
    checkProposalStatus(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setProposalSubmitted(false);
    localStorage.removeItem("hackathon_user");
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onLoginClick={() => setShowLoginModal(true)}
          currentUser={currentUser}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isLoggedIn={isLoggedIn}
                hasSubmittedProposal={proposalSubmitted}
                onLoginClick={() => setShowLoginModal(true)}
                teamName={currentUser}
              />
            }
          />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/selected-teams" element={<SelectedTeams />} />
          <Route
            path="/submit-proposal"
            element={
              isLoggedIn && !proposalSubmitted ? (
                <SubmitProposal
                  teamName={currentUser}
                  onSubmitSuccess={() => setProposalSubmitted(true)}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
