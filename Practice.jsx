import React from "react";
import { Link } from "react-router-dom";

export default function Practice() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h2>Practice Zone 🧠</h2>
      <p style={{ color: "#4b5563" }}>
        Choose how you want to practice. Each activity helps you strengthen your KCSE skills.
      </p>

      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        <Link to="/quiz" style={cardStyle}>
          <h3>Quick Quizzes</h3>
          <p>Timed multiple-choice quizzes by topic</p>
        </Link>

        <Link to="/pastpapers" style={cardStyle}>
          <h3>Past Papers Practice</h3>
          <p>Attempt KCSE-style past papers directly online</p>
        </Link>

        <Link to="/lessons" style={cardStyle}>
          <h3>Video/Audio Practice</h3>
          <p>Learn from recorded lessons, then test yourself</p>
        </Link>

        <Link to="/music" style={cardStyle}>
          <h3>Music/Beat Practice</h3>
          <p>Explore rhythm and creative sound learning</p>
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  display: "block",
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  textDecoration: "none",
  color: "#111827",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};