// src/services/geminiService.ts
const API_BASE = "https://mcp-backend-m58k.onrender.com";

interface ApiResponse {
  message?: string;
  token?: string;
}

export const api = {
  /** 📝 User Signup */
  signup: async (email: string, password: string): Promise<ApiResponse> => {
    try {
      const res = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      return await res.json();
    } catch (error) {
      console.error("Signup failed:", error);
      return { message: "Signup failed. Please try again later." };
    }
  },

  /** 🔐 User Login */
  login: async (email: string, password: string): Promise<ApiResponse> => {
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      return { message: "Login failed. Please try again later." };
    }
  },

  /** 👤 Get Current User */
  getMe: async (): Promise<ApiResponse> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return { message: "No token found. Please log in again." };

      const res = await fetch(`${API_URL}/api/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      return await res.json();
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      return { message: "Failed to fetch user info." };
    }
  },

  /** 🚀 Upgrade Subscription */
  upgrade: async (): Promise<ApiResponse> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return { message: "No token found. Please log in again." };

      const res = await fetch(`${API_URL}/api/upgrade`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      console.error("Upgrade failed:", error);
      return { message: "Upgrade failed. Please try again later." };
    }
  },
};
