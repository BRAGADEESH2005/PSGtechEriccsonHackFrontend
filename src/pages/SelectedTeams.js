import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import './SelectedTeams.css';

const SelectedTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSelectedTeams();
  }, []);

  const fetchSelectedTeams = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/teams/selected`);
      setTeams(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load selected teams. Please try again later.');
      console.error('Error fetching teams:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="selected-teams-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading selected teams...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="selected-teams-page">
      <div className="container">
        <div className="page-header">
          <h1>🏆 Selected Teams</h1>
          <p className="page-subtitle">
            Congratulations to the {teams.length} teams advancing to the hackathon!
          </p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="teams-container">
          {teams.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No teams selected yet</h3>
              <p>Selected teams will appear here once the evaluation is complete</p>
            </div>
          ) : (
            <div className="teams-grid">
              {teams.map((team, index) => (
                <div key={team._id} className="team-card">
                  <div className="team-rank">#{index + 1}</div>
                  <div className="team-logo-container">
                    {team.projectLogo ? (
                      <img 
                        src={team.projectLogo} 
                        alt={`${team.teamName} logo`}
                        className="team-logo"
                      />
                    ) : (
                      <div className="team-logo-placeholder">
                        {team.teamName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <h3 className="team-name">{team.teamName}</h3>
                  <h4 className="project-title">{team.projectTitle}</h4>
                  <div className="team-members">
                    <div className="members-header">
                      <span className="members-icon">👥</span>
                      <span>Team Members</span>
                    </div>
                    <ul className="members-list">
                      {team.students.map((student, idx) => (
                        <li key={idx} className="member-item">
                          <span className="member-name">{student.name}</span>
                          <span className={`member-dept dept-${student.department.toLowerCase()}`}>
                            {student.department}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="team-badge">
                    <span className="badge-icon">✨</span>
                    <span>Selected for Hackathon</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedTeams;