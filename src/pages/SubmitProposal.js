import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, DEPARTMENTS } from '../constants';
import './SubmitProposal.css';

const SubmitProposal = ({ teamName, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    teamName: teamName,
    students: [
      { name: '', email: '', department: 'ECE' },
      { name: '', email: '', department: 'CSE' },
      { name: '', email: '', department: 'RAE' }
    ],
    projectTitle: '',
    projectLogo: '',
    projectLogoPublicId: '',
    teamComposition: '',
    problemStatement: '',
    toolsAndMethodology: '',
    implementationPlan: '',
    projectFlowSlides: '',
    expectedResults: '',
    additionalDetails: ''
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(`proposal_draft_${teamName}`);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData({ ...parsedData, teamName });
      } catch (err) {
        console.error('Error loading saved draft:', err);
      }
    }
  }, [teamName]);

  // Save to localStorage on change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(`proposal_draft_${teamName}`, JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData, teamName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...formData.students];
    updatedStudents[index][field] = value;
    setFormData(prev => ({
      ...prev,
      students: updatedStudents
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5000000) {
      setError('Image size should be less than 5MB');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    try {
      setUploading(true);
      setError('');
      setUploadProgress(0);

      // Create form data
      const uploadFormData = new FormData();
      uploadFormData.append('logo', file);
      uploadFormData.append('teamName', teamName);

      // Upload to backend API
      const response = await axios.post(
        `${API_BASE_URL}/upload/logo`,
        uploadFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        }
      );

      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          projectLogo: response.data.data.url,
          projectLogoPublicId: response.data.data.publicId
        }));
        setSuccess('Logo uploaded successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload logo. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveLogo = async () => {
    if (formData.projectLogoPublicId) {
      try {
        await axios.delete(`${API_BASE_URL}/upload/logo`, {
          data: { publicId: formData.projectLogoPublicId }
        });
      } catch (err) {
        console.error('Error deleting logo:', err);
      }
    }

    setFormData(prev => ({
      ...prev,
      projectLogo: '',
      projectLogoPublicId: ''
    }));
  };

  const validateForm = () => {
    // Check all students have data
    for (let student of formData.students) {
      if (!student.name || !student.email) {
        return 'Please fill in all student details';
      }
      if (!/\S+@\S+\.\S+/.test(student.email)) {
        return 'Please enter valid email addresses';
      }
    }

    // Check required fields
    if (!formData.projectTitle || !formData.problemStatement || 
        !formData.toolsAndMethodology || !formData.implementationPlan ||
        !formData.projectFlowSlides || !formData.expectedResults) {
      return 'Please fill in all required fields';
    }

    // Check Google Sheets/Docs link format
    if (!formData.projectFlowSlides.includes('docs.google.com')) {
      return 'Please provide a valid Google Docs/Slides link for project flow slides';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const response = await axios.post(`${API_BASE_URL}/proposals/submit`, formData);
      
      setSuccess('Proposal submitted successfully! Redirecting...');
      localStorage.removeItem(`proposal_draft_${teamName}`);
      
      setTimeout(() => {
        onSubmitSuccess();
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit proposal. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="submit-proposal-page">
      <div className="container">
        <div className="page-header">
          <h1>Submit Proposal</h1>
          <p className="page-subtitle">Team: {teamName}</p>
          <p className="draft-info">💾 Your progress is automatically saved</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="proposal-form">
          {/* Team Members Section */}
          <div className="form-section">
            <h2 className="section-title">👥 Team Members</h2>
            <p className="section-description">
              All three departments (ECE, CSE, RAE) are mandatory
            </p>
            
            {formData.students.map((student, index) => (
              <div key={index} className="student-card">
                <h4>Member {index + 1}</h4>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={student.name}
                      onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                      placeholder="Enter student name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={student.email}
                      onChange={(e) => handleStudentChange(index, 'email', e.target.value)}
                      placeholder="student@psgtech.ac.in"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Department *</label>
                  <select
                    className="form-control"
                    value={student.department}
                    onChange={(e) => handleStudentChange(index, 'department', e.target.value)}
                    required
                  >
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Project Details Section */}
          <div className="form-section">
            <h2 className="section-title">🚀 Project Details</h2>
            
            <div className="form-group">
              <label>Project Title *</label>
              <input
                type="text"
                className="form-control"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleInputChange}
                placeholder="Enter your innovative project title"
                required
              />
            </div>

            <div className="form-group">
              <label>Project Logo</label>
              <input
                type="file"
                className="form-control"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleLogoUpload}
                disabled={uploading}
              />
              
              {uploading && (
                <div className="upload-status">
                  <div className="upload-progress">
                    <div className="upload-spinner"></div>
                    <span>Uploading... {uploadProgress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {formData.projectLogo && (
                <div className="logo-preview">
                  <img 
                    src={formData.projectLogo} 
                    alt="Project logo" 
                    className="uploaded-logo"
                  />
                  <button
                    type="button"
                    className="remove-logo-btn"
                    onClick={handleRemoveLogo}
                    disabled={uploading}
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
              
              <p className="field-hint">
                Upload your team/project logo (max 5MB, JPEG/PNG/GIF/WebP)
              </p>
            </div>

            <div className="form-group">
              <label>Team Composition *</label>
              <textarea
                className="form-control"
                name="teamComposition"
                value={formData.teamComposition}
                onChange={handleInputChange}
                placeholder="Describe how your team's diverse skills complement each other..."
                rows="4"
                required
              />
            </div>
          </div>

          {/* Problem & Solution Section */}
          <div className="form-section">
            <h2 className="section-title">💡 Problem & Solution</h2>
            
            <div className="form-group">
              <label>Problem Statement & Understanding *</label>
              <textarea
                className="form-control"
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleInputChange}
                placeholder="Clearly define the problem you're addressing and your understanding of it..."
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label>Tools & Methodology *</label>
              <textarea
                className="form-control"
                name="toolsAndMethodology"
                value={formData.toolsAndMethodology}
                onChange={handleInputChange}
                placeholder="List the tools, technologies, and methodologies you'll use..."
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label>Short Implementation Plan *</label>
              <textarea
                className="form-control"
                name="implementationPlan"
                value={formData.implementationPlan}
                onChange={handleInputChange}
                placeholder="Outline your step-by-step implementation plan..."
                rows="6"
                required
              />
            </div>
          </div>

          {/* Project Flow & Results Section */}
          <div className="form-section">
            <h2 className="section-title">📊 Project Flow & Results</h2>
            
            <div className="form-group">
              <label>Project Flow Slides (Google Docs/Slides Link) *</label>
              <input
                type="url"
                className="form-control"
                name="projectFlowSlides"
                value={formData.projectFlowSlides}
                onChange={handleInputChange}
                placeholder="https://docs.google.com/presentation/d/..."
                required
              />
              <p className="field-hint">
                Upload 5 slides showing your project workflow to Google Slides/Docs and share the link
              </p>
            </div>

            <div className="form-group">
              <label>Expected Results *</label>
              <textarea
                className="form-control"
                name="expectedResults"
                value={formData.expectedResults}
                onChange={handleInputChange}
                placeholder="Describe the expected outcomes and impact of your project..."
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label>Additional Details</label>
              <textarea
                className="form-control"
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleInputChange}
                placeholder="Any additional information you'd like to share..."
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={submitting || uploading}
            >
              {submitting ? 'Submitting Proposal...' : 'Submit Proposal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitProposal;