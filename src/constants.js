// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// export const API_BASE_URL = 'https://ps-gtech-ericcson-backend.vercel.app/api';

// Admin Configuration
export const ADMIN_PASSWORD = 'admin@ericsson2024';

// Department List
export const DEPARTMENTS = ['ECE', 'CSE', 'RAE'];

// Team Credentials (Pre-registered teams)
export const TEAM_CREDENTIALS = [
  { teamName: 'Alpha', password: 'alpha2024' },
  { teamName: 'Team Beta', password: 'beta2024' },
  { teamName: 'Team Gamma', password: 'gamma2024' },
  { teamName: 'Team Delta', password: 'delta2024' },
  { teamName: 'Team Epsilon', password: 'epsilon2024' },
  { teamName: 'Team Zeta', password: 'zeta2024' },
  { teamName: 'Team Eta', password: 'eta2024' },
  { teamName: 'Team Theta', password: 'theta2024' },
  { teamName: 'Team Iota', password: 'iota2024' },
  { teamName: 'Team Kappa', password: 'kappa2024' },
  { teamName: 'Team Lambda', password: 'lambda2024' },
  { teamName: 'Team Mu', password: 'mu2024' },
  { teamName: 'Team Nu', password: 'nu2024' },
  { teamName: 'Team Xi', password: 'xi2024' },
  { teamName: 'Team Omicron', password: 'omicron2024' },
  { teamName: 'Team Pi', password: 'pi2024' },
  { teamName: 'Team Rho', password: 'rho2024' },
  { teamName: 'Team Sigma', password: 'sigma2024' },
  { teamName: 'Team Tau', password: 'tau2024' },
  { teamName: 'Team Upsilon', password: 'upsilon2024' },
  { teamName: 'Team Phi', password: 'phi2024' },
  { teamName: 'Team Chi', password: 'chi2024' },
  { teamName: 'Team Psi', password: 'psi2024' },
  { teamName: 'Team Omega', password: 'omega2024' },
  { teamName: 'Team Phoenix', password: 'phoenix2024' },
  { teamName: 'Team Titan', password: 'titan2024' },
  { teamName: 'Team Nebula', password: 'nebula2024' },
  { teamName: 'Team Quantum', password: 'quantum2024' },
  { teamName: 'Team Nexus', password: 'nexus2024' },
  { teamName: 'Team Vertex', password: 'vertex2024' }
];

// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  cloudName: 'drvtankdr',
  uploadPreset: 'hackathon_logos',
  folder: 'hackathon-logos'
};

// Priority Levels for Announcements
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// Proposal Status
export const PROPOSAL_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  SELECTED: 'selected',
  REJECTED: 'rejected'
};

// Form Validation Rules
export const VALIDATION_RULES = {
  MAX_FILE_SIZE: 5000000, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  MIN_TEAM_MEMBERS: 3,
  MAX_TEAM_MEMBERS: 3,
  MAX_SELECTED_TEAMS: 15
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  ANNOUNCEMENTS: '/announcements',
  SELECTED_TEAMS: '/selected-teams',
  SUBMIT_PROPOSAL: '/submit-proposal',
  ADMIN: '/admin'
};