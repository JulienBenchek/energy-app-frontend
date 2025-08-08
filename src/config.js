const isProd = process.env.NODE_ENV === "production";

export const API_BASE_URL = isProd
  ? "https://energy-app-backend-production.up.railway.app"
  : "http://localhost:8000"; // backend dev URL
