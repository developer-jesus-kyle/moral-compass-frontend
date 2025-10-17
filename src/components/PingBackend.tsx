import React, { useState } from "react";

const PingBackend: React.FC = () => {
  const [response, setResponse] = useState<string>("");

  const handlePing = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setResponse(`✅ Connected! Status: ${res.status}`);
    } catch (err) {
      setResponse("❌ Connection failed — check your backend URL.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={handlePing}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Ping Backend
      </button>
      <p style={{ marginTop: "10px" }}>{response}</p>
    </div>
  );
};

export default PingBackend;
