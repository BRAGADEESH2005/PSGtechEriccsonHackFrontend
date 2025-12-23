import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, ADMIN_PASSWORD } from '../constants';
import './AdminPanel.css';

const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('proposals');
  const [proposals, setProposals] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Announcement form
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
    priority: 'medium'
  });

  // Deadline form
  const [deadline, setDeadline] = useState('');
  const [currentDeadline, setCurrentDeadline] = useState(null);

  // Check for stored admin session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('hackathon_admin_auth');
    if (storedAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchProposals();
      fetchSettings();
      fetchSelectedCount();
    }
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem('hackathon_admin_auth', 'true');
      setError('');
    } else {
      setError('Invalid admin password');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('hackathon_admin_auth');
    setPassword('');
  };

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/admin/proposals`, {
        password: ADMIN_PASSWORD
      });
      setProposals(response.data);
    } catch (err) {
      setError('Failed to fetch proposals');
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedCount = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/selected-count`, {
        password: ADMIN_PASSWORD
      });
      setSelectedCount(response.data.count);
    } catch (err) {
      console.error('Error fetching selected count:', err);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/settings`);
      if (response.data) {
        setCurrentDeadline(response.data.submissionDeadline);
        setDeadline(new Date(response.data.submissionDeadline).toISOString().slice(0, 16));
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handleToggleSelection = async (proposalId, currentStatus) => {
    const action = currentStatus === 'selected' ? 'deselect' : 'select';
    
    // Show confirmation dialog
    const confirmMessage = currentStatus === 'selected' 
      ? 'Are you sure you want to deselect this team?'
      : 'Are you sure you want to select this team for the hackathon?';
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/admin/toggle-selection/${proposalId}`,
        { password: ADMIN_PASSWORD }
      );

      if (response.data.success) {
        setSuccess(response.data.message);
        await fetchProposals();
        await fetchSelectedCount();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to toggle selection';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/admin/announcements`, {
        password: ADMIN_PASSWORD,
        ...announcementForm
      });
      setSuccess('Announcement posted successfully!');
      setAnnouncementForm({ title: '', content: '', priority: 'medium' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to post announcement');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDeadline = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/admin/deadline`, {
        password: ADMIN_PASSWORD,
        deadline: new Date(deadline)
      });
      setSuccess('Deadline updated successfully!');
      setCurrentDeadline(deadline);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update deadline');
    } finally {
      setLoading(false);
    }
  };

  const viewProposalDetails = (proposal) => {
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>${proposal.teamName} - Proposal</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 900px; margin: 0 auto; }
            h1 { color: #0066cc; }
            h2 { color: #333; margin-top: 30px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
            .section { margin-bottom: 25px; }
            .label { font-weight: bold; color: #666; }
            .logo { max-width: 200px; margin: 20px 0; }
            .student { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 8px; }
            .badge { display: inline-block; padding: 5px 12px; border-radius: 15px; font-size: 12px; }
            .status-selected { background: #28a745; color: white; }
            .status-submitted { background: #ffc107; color: #333; }
          </style>
        </head>
        <body>
          <h1>${proposal.projectTitle}</h1>
          <p><span class="badge status-${proposal.status}">${proposal.status.toUpperCase()}</span></p>
          
          ${proposal.projectLogo ? `<img src="${proposal.projectLogo}" class="logo" alt="Logo">` : ''}
          
          <h2>Team Information</h2>
          <div class="section">
            <p><span class="label">Team Name:</span> ${proposal.teamName}</p>
            <h3>Members:</h3>
            ${proposal.students.map(s => `
              <div class="student">
                <strong>${s.name}</strong> (${s.department})<br>
                ${s.email}
              </div>
            `).join('')}
          </div>

          <h2>Team Composition</h2>
          <div class="section">
            <p>${proposal.teamComposition}</p>
          </div>

          <h2>Problem Statement</h2>
          <div class="section">
            <p>${proposal.problemStatement}</p>
          </div>

          <h2>Tools & Methodology</h2>
          <div class="section">
            <p>${proposal.toolsAndMethodology}</p>
          </div>

          <h2>Implementation Plan</h2>
          <div class="section">
            <p>${proposal.implementationPlan}</p>
          </div>

          <h2>Project Flow Slides</h2>
          <div class="section">
            <a href="${proposal.projectFlowSlides}" target="_blank">${proposal.projectFlowSlides}</a>
          </div>

          <h2>Expected Results</h2>
          <div class="section">
            <p>${proposal.expectedResults}</p>
          </div>

          ${proposal.additionalDetails ? `
            <h2>Additional Details</h2>
            <div class="section">
              <p>${proposal.additionalDetails}</p>
            </div>
          ` : ''}

          <h2>Submission Details</h2>
          <div class="section">
            <p><span class="label">Submitted:</span> ${new Date(proposal.submittedAt).toLocaleString()}</p>
          </div>
        </body>
      </html>
    `);
  };

  if (!authenticated) {
    return (
      <div className="admin-panel">
        <div className="admin-login-container">
          <div className="admin-login-card">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <label>Admin Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'proposals' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposals')}
          >
            Proposals ({proposals.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            Post Announcement
          </button>
          <button
            className={`tab-btn ${activeTab === 'deadline' ? 'active' : ''}`}
            onClick={() => setActiveTab('deadline')}
          >
            Manage Deadline
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'proposals' && (
            <div className="proposals-section">
              <div className="selection-header">
                <h2>Team Selection for Hackathon</h2>
                <div className="selection-info">
                  <span className="selection-count">
                    Selected: {selectedCount}/15
                  </span>
                </div>
              </div>

              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Loading proposals...</p>
                </div>
              ) : (
                <div className="proposals-grid">
                  {proposals.map((proposal) => (
                    <div
                      key={proposal._id}
                      className={`proposal-card ${proposal.status === 'selected' ? 'selected' : ''}`}
                    >
                      <div className="proposal-header">
                        <div>
                          <h3>{proposal.teamName}</h3>
                          <p className="project-title">{proposal.projectTitle}</p>
                        </div>
                        <span className={`status-badge ${proposal.status}`}>
                          {proposal.status}
                        </span>
                      </div>

                      <div className="proposal-students">
                        {proposal.students.map((student, idx) => (
                          <div key={idx} className="student-tag">
                            {student.name} ({student.department})
                          </div>
                        ))}
                      </div>

                      <div className="proposal-actions">
                        <button
                          onClick={() => viewProposalDetails(proposal)}
                          className="btn btn-sm btn-primary"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleToggleSelection(proposal._id, proposal.status)}
                          className={`btn btn-sm ${
                            proposal.status === 'selected' ? 'btn-danger' : 'btn-success'
                          }`}
                          disabled={
                            loading || 
                            (proposal.status !== 'selected' && selectedCount >= 15)
                          }
                        >
                          {proposal.status === 'selected' ? 'Deselect' : 'Select'}
                        </button>
                      </div>

                      <div className="proposal-date">
                        Submitted: {new Date(proposal.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="announcements-section">
              <h2>Post New Announcement</h2>
              <form onSubmit={handlePostAnnouncement} className="announcement-form">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={announcementForm.title}
                    onChange={(e) =>
                      setAnnouncementForm({ ...announcementForm, title: e.target.value })
                    }
                    placeholder="Announcement title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Content *</label>
                  <textarea
                    className="form-control"
                    value={announcementForm.content}
                    onChange={(e) =>
                      setAnnouncementForm({ ...announcementForm, content: e.target.value })
                    }
                    placeholder="Announcement content"
                    rows="6"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select
                    className="form-control"
                    value={announcementForm.priority}
                    onChange={(e) =>
                      setAnnouncementForm({ ...announcementForm, priority: e.target.value })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Posting...' : 'Post Announcement'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'deadline' && (
            <div className="deadline-section">
              <h2>Manage Submission Deadline</h2>
              
              {currentDeadline && (
                <div className="current-deadline">
                  <p><strong>Current Deadline:</strong></p>
                  <p className="deadline-date">
                    {new Date(currentDeadline).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}

              <form onSubmit={handleUpdateDeadline} className="deadline-form">
                <div className="form-group">
                  <label>New Deadline *</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Deadline'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;