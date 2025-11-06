import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Dashboard() {
  const [user] = useAuthState(auth);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>Welcome to KCSE Learning Hub 🎓</h2>
      <p style={{ color: "#4b5563" }}>
        Learn, revise, and practice for KCSE exams with interactive quizzes,
        video/audio lessons, and real past papers — all in one place.
      </p>

      {user ? (
        <div style={{ marginTop: 20, padding: 16, background: "white", borderRadius: 8 }}>
          <h3>Hello {user.email} 👋</h3>
          <p style={{ color: "#6b7280" }}>Continue your KCSE learning journey below.</p>
        </div>
      ) : (
        <div style={{ marginTop: 20, padding: 16, background: "white", borderRadius: 8 }}>
          <p>Please <Link to="/auth">sign in</Link> or <Link to="/auth">create an account</Link> to track your progress.</p>
        </div>
      )}

      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <Link to="/subjects" style={cardStyle}>
          <h3>Subjects</h3>
          <p>Browse KCSE subjects and learning materials</p>
        </Link>

        <Link to="/practice" style={cardStyle}>
          <h3>Practice Zone</h3>
          <p>Do quizzes, mock questions, and progress checks</p>
        </Link>

        <Link to="/pastpapers" style={cardStyle}>
          <h3>Past Papers</h3>
          <p>Access and download real KCSE past papers</p>
        </Link>

        <Link to="/lessons" style={cardStyle}>
          <h3>Lessons</h3>
          <p>Watch and listen to video/audio lessons</p>
        </Link>

        <Link to="/quiz" style={cardStyle}>
          <h3>KCSE Quizzes</h3>
          <p>Challenge yourself with topic quizzes</p>
        </Link>

        <Link to="/music" style={cardStyle}>
          <h3>Music Maker 🎵</h3>
          <p>Learn rhythm and beat-making interactively</p>
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