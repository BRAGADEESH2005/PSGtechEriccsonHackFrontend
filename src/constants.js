// API Configuration
// export const API_BASE_URL =
// process.env.REACT_APP_API_URL || "http://localhost:5000/api";
export const API_BASE_URL = "https://ps-gtech-ericcson-backend.vercel.app/api";

// Admin Configuration
export const ADMIN_PASSWORD = "admin@ericsson2024";

// Department List
export const DEPARTMENTS = ["ECE", "CSE", "RAE"];

// Team Credentials (Pre-registered teams)
// ...existing code...

// Team Credentials (Pre-registered teams)
export const TEAM_CREDENTIALS = [
  { teamName: "Alpha", password: "923700" },
  { teamName: "Latency Zero", password: "844287" },
  { teamName: "Tricore", password: "499619" },
  { teamName: "VoxNova", password: "255695" },
  { teamName: "Infoverse", password: "914781" },
  { teamName: "RoboX Revolt", password: "397181" },
  { teamName: "SyncX", password: "725879" },
  { teamName: "Robozen", password: "401560" },
  { teamName: "Hybrid minds", password: "378329" },
  { teamName: "IntelliBots", password: "335115" },
  { teamName: "Tribyte", password: "210" },
  { teamName: "XLREIGHT", password: "394528" },
  { teamName: "Botsquad", password: "725676" },
  { teamName: "Tritech", password: "686429" },
  { teamName: "InnovateX", password: "627294" },
  { teamName: "Trio de Janeiro", password: "528649" },
  { teamName: "Cracking cobots", password: "134162" },
  { teamName: "D2D workers", password: "866129" },
  { teamName: "CoBotX", password: "590631" },
  { teamName: "Neo Tech", password: "692207" },
  { teamName: "BotHeads", password: "420191" },
  { teamName: "IdeaMatrix", password: "711827" },
  { teamName: "RoboStriders", password: "315853" },
  { teamName: "TriTech", password: "494919" },
  { teamName: "Echo Bots", password: "671548" },
  { teamName: "Black", password: "755747" },
  { teamName: "Cryptex", password: "292062" },
  { teamName: "NexusTech", password: "902618" },
  { teamName: "CoBot Connect", password: "771901" },
  { teamName: "Tech Titans", password: "810709" },
  { teamName: "Robo", password: "572501" },
  { teamName: "Wakamaru", password: "119334" },
  { teamName: "Fusion minds", password: "802986" },
  { teamName: "Ingenix", password: "448053" },
];

// ...existing code...

// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  cloudName: "drvtankdr",
  uploadPreset: "hackathon_logos",
  folder: "hackathon-logos",
};

// Priority Levels for Announcements
export const PRIORITY_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

// Proposal Status
export const PROPOSAL_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  SELECTED: "selected",
  REJECTED: "rejected",
};

// Form Validation Rules
export const VALIDATION_RULES = {
  MAX_FILE_SIZE: 5000000, // 5MB
  ALLOWED_IMAGE_TYPES: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ],
  MIN_TEAM_MEMBERS: 3,
  MAX_TEAM_MEMBERS: 3,
  MAX_SELECTED_TEAMS: 15,
};

// Route Paths
export const ROUTES = {
  HOME: "/",
  ANNOUNCEMENTS: "/announcements",
  SELECTED_TEAMS: "/selected-teams",
  SUBMIT_PROPOSAL: "/submit-proposal",
  ADMIN: "/admin",
};
