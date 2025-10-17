import React, { useState } from "react";
import { api } from "./services/geminiService";

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ email?: string; subscription?: string } | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    setMessage("");
    const res = await api.signup(email, password);
    setMessage(res.message || "Signup complete.");
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    const res = await api.login(email, password);
    if (res.token) {
      const me = await api.getMe();
      setUser(me as any);
      setMessage("Login successful.");
    } else {
      setMessage(res.message || "Login failed.");
    }
    setLoading(false);
  };

  const handleUpgrade = async () => {
    setLoading(true);
    const res = await api.upgrade();
    setMessage(res.message || "Upgrade complete!");
    const me = await api.getMe();
    setUser(me as any);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMessage("Logged out.");
  };

  return (
    <div style={{ padding: 40, fontFamily: "Inter, sans-serif", maxWidth: 480, margin: "auto" }}>
      <h1 style={{ color: "#222", textAlign: "center" }}>Moral Compass Protocol</h1>

      {!user ? (
        <>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", marginBottom: 10, padding: 8, width: "100%" }}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", marginBottom: 10, padding: 8, width: "100%" }}
          />
          <button
            onClick={handleSignup}
            disabled={loading}
            style={{
              background: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              marginRight: 10,
            }}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              background: "#007BFF",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </>
      ) : (
        <>
          <p>
            <strong>Welcome:</strong> {user.email}
            <br />
            <strong>Subscription:</strong> {user.subscription}
          </p>

          {user.subscription === "free" && (
            <button
              onClick={handleUpgrade}
              disabled={loading}
              style={{
                background: "#FFC107",
                color: "#000",
                padding: "10px 20px",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {loading ? "Upgrading..." : "Upgrade to Premium"}
            </button>
          )}

          <button
            onClick={handleLogout}
            style={{
              background: "#F44336",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              marginLeft: 10,
            }}
          >
            Logout
          </button>
        </>
      )}

      {message && (
        <div
          style={{
            marginTop: 20,
            padding: 10,
            borderRadius: 6,
            background: message.toLowerCase().includes("fail") ? "#ffe5e5" : "#e5ffe5",
            color: message.toLowerCase().includes("fail") ? "#d00" : "#080",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default App;
