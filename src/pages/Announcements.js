import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import './Announcements.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/announcements`);
      setAnnouncements(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load announcements. Please try again later.');
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="announcements-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading announcements...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="announcements-page">
      <div className="container">
        <div className="page-header">
          <h1>Announcements</h1>
          <p className="page-subtitle">Stay updated with the latest hackathon news</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="announcements-container">
          {announcements.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📢</div>
              <h3>No announcements yet</h3>
              <p>Check back later for updates</p>
            </div>
          ) : (
            <div className="announcements-list">
              {announcements.map((announcement) => (
                <div 
                  key={announcement._id} 
                  className={`announcement-card ${getPriorityClass(announcement.priority)}`}
                >
                  <div className="announcement-header">
                    <h3 className="announcement-title">{announcement.title}</h3>
                    <span className={`priority-badge ${announcement.priority}`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="announcement-content">{announcement.content}</p>
                  <div className="announcement-footer">
                    <span className="announcement-date">
                      📅 {formatDate(announcement.createdAt)}
                    </span>
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

export default Announcements;