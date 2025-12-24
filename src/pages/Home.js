import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = ({ isLoggedIn, hasSubmittedProposal, onLoginClick, teamName }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Trigger animations on mount
    const timer = setTimeout(() => {
      setIsVisible({
        hero: true,
        features: true,
        timeline: true,
        cta: true,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: "🚀",
      title: "Innovation First",
      description:
        "Push the boundaries of technology with cutting-edge solutions and creative thinking",
    },
    {
      icon: "🏆",
      title: "Win Big",
      description:
        "Compete for exciting prizes and recognition from industry leaders",
    },
    {
      icon: "💡",
      title: "Learn & Grow",
      description:
        "Gain hands-on experience and mentorship from Ericsson experts",
    },
  ];

  const timeline = [
    {
      phase: "Phase 1",
      title: "Team Formation",
      date: "Dec 8-17, 2025",
      description:
        "Form your interdisciplinary team and register for the hackathon",
      icon: "📝",
    },
    {
      phase: "Phase 2",
      title: "Problem Statement Announcement",
      date: "Dec 17, 2025",
      description:
        "Official problem statement released to all registered teams",
      icon: "📢",
    },
    {
      phase: "Phase 3",
      title: "Proposal Development",
      date: "Dec 17-25, 2025",
      description:
        "Develop your innovative project proposal with detailed implementation plan",
      icon: "📊",
    },
    {
      phase: "Phase 4",
      title: "Proposal Submission",
      date: "Dec 25, 2025",
      description:
        "Submit your finalized proposal for evaluation and team selection",
      icon: "✨",
    },
    {
      phase: "Phase 5",
      title: "Proposal Analysis & Feedback",
      date: "Dec 26, 2025",
      description:
        "Expert evaluation of proposals and selection of 15 finalist teams",
      icon: "🔍",
    },
    {
      phase: "Phase 6",
      title: "30-Hour Hackathon",
      date: "Jan 3-4, 2026",
      description:
        "Build your solution and present to the jury for final evaluation",
      icon: "🎯",
    },
    {
      phase: "Phase 7",
      title: "Internship & Training",
      date: "Apr-May 2026",
      description:
        "Selected winners receive internship opportunities and advanced training",
      icon: "🚀",
    },
  ];

  const stats = [
    { number: "30+", label: "Teams Competing" },
    { number: "15", label: "Finalist Teams" },
    { number: "3", label: "Departments" },
    { number: "30hrs", label: "Innovation Time" },
  ];

  // Determine which buttons to show based on user status
  const getPrimaryButton = () => {
    if (!isLoggedIn) {
      return {
        text: "Team Login",
        icon: "🔐",
        action: () => onLoginClick(),
        className: "btn-primary",
      };
    } else if (!hasSubmittedProposal) {
      return {
        text: "Submit Proposal",
        icon: "→",
        action: () => navigate("/submit-proposal"),
        className: "btn-primary",
      };
    } else {
      return {
        text: "View Announcements",
        icon: "📢",
        action: () => navigate("/announcements"),
        className: "btn-primary",
      };
    }
  };

  const getSecondaryButton = () => {
    if (!isLoggedIn) {
      return {
        text: "View Selected Teams",
        action: () => navigate("/selected-teams"),
      };
    } else if (!hasSubmittedProposal) {
      return {
        text: "View Guidelines",
        action: () => navigate("/announcements"),
      };
    } else {
      return {
        text: "View Selected Teams",
        action: () => navigate("/selected-teams"),
      };
    }
  };

  const primaryBtn = getPrimaryButton();
  const secondaryBtn = getSecondaryButton();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className={`hero-section ${isVisible.hero ? "visible" : ""}`}>
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">⚡</span>
            <span>
              PSG College Of Technology and Ericsson Research India Presents
            </span>
          </div>

          <h1 className="hero-title">
            <span className="title-line">Collaborative Robots</span>
            <span className="title-line highlight">Hackathon 2026</span>
          </h1>

          <p className="hero-description">
            Join the ultimate interdisciplinary hackathon where ECE, CSE, and
            RAE students collaborate to create innovative solutions for
            real-world challenges
          </p>

          {/* Show welcome message if logged in */}
          {console.log(
            "Rendering Home with isLoggedIn:",
            isLoggedIn,
            "hasSubmittedProposal:",
            hasSubmittedProposal
          )}
          {isLoggedIn && (
            <div>
              {hasSubmittedProposal && (
                <span className="status-badge success">
                  ✓ Proposal Submitted
                </span>
              )}
            </div>
          )}

          <div className="hero-buttons">
            <button
              className={`btn ${primaryBtn.className} btn-large`}
              onClick={primaryBtn.action}
            >
              <span>{primaryBtn.text}</span>
              <span className="btn-icon">{primaryBtn.icon}</span>
            </button>
          </div>

          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`features-section ${isVisible.features ? "visible" : ""}`}
      >
        <div className="section-container">
          <div className="section-header">
            {/* <span className="section-tag">Why Participate</span> */}
            <h2 className="section-title">Participate To</h2>
            <p className="section-description">
              Experience the perfect blend of learning, innovation, and
              competition
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-icon-bg"></div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        className={`timeline-section ${isVisible.timeline ? "visible" : ""}`}
      >
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Journey</span>
            <h2 className="section-title">Hackathon Timeline</h2>
            <p className="section-description">
              Your path from registration to victory
            </p>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-line"></div>
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`timeline-item ${
                  index % 2 === 0 ? "left" : "right"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="timeline-content">
                  <div className="timeline-icon">
                    <span>{item.icon}</span>
                  </div>
                  <div className="timeline-card">
                    <span className="timeline-phase">{item.phase}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <span className="timeline-date">{item.date}</span>
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* // ...existing code... */}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-column">
              <h3 className="footer-logo">
                <span className="logo-icon">⚡</span>
                Collaborative Robots Hackathon
              </h3>
              <p className="footer-description">
                Empowering the next generation of innovators through
                collaborative technology challenges and real-world problem
                solving.
              </p>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/announcements">Announcements</a>
                </li>
                <li>
                  <a href="/selected-teams">Selected Teams</a>
                </li>
                {isLoggedIn && !hasSubmittedProposal && (
                  <li>
                    <a href="/submit-proposal">Submit Proposal</a>
                  </li>
                )}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-contact">
                <li>
                  <span className="contact-icon">📧</span>
                  <span>22l227@psgtech.ac.in</span>
                </li>
                <li>
                  <span className="contact-icon">📱</span>
                  <span>+91 86808 17413</span>
                </li>
                <li>
                  <span className="contact-icon">👤</span>
                  <span>JAYA SURYA (ECE)</span>
                </li>
                <li className="contact-divider"></li>
                <li>
                  <span className="contact-icon">📧</span>
                  <span>23Z431@psgtech.ac.in</span>
                </li>
                <li>
                  <span className="contact-icon">📱</span>
                  <span>+91 94448 66750</span>
                </li>
                <li>
                  <span className="contact-icon">👤</span>
                  <span>DWARKESH (CSE)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                © 2024 Ericsson Hackathon. All rights reserved.
              </p>
              <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <span className="separator">•</span>
                <a href="#">Terms of Service</a>
                <span className="separator">•</span>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
            
            <div className="footer-developer">
              <div className="developer-content">
                <span className="developer-label">Developed by</span>
                <div className="developer-info">
                  <span className="developer-name">Bragadeesh V</span>
                  <div className="developer-social">
                    <a
                      href="https://www.linkedin.com/in/bragadeesh05/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon linkedin"
                      aria-label="LinkedIn"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a
                      href="mailto:bragadeesh2005@gmail.com"
                      className="social-icon gmail"
                      aria-label="Email"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                    <a
                      href="https://github.com/BRAGADEESH2005"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon github"
                      aria-label="GitHub"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
