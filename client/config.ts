// Helper to switch between local and deployed backend
export const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
