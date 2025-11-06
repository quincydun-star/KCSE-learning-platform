import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Subjects from "./pages/Subjects";
import PastPapers from "./pages/PastPapers";
import Lessons from "./pages/Lessons";
import AuthPage from "./pages/AuthPage";
import QuizPage from "./pages/QuizPage";
import MusicMaker from "./pages/MusicMaker";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="brand">KCSE Learning Hub</div>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/practice">Practice</Link>
          <Link to="/subjects">Subjects</Link>
          <Link to="/pastpapers">Past Papers</Link>
          <Link to="/lessons">Lessons</Link>
          <Link to="/quiz">Quizzes</Link>
          <Link to="/music">Music Maker</Link>
        </nav>
        <div className="auth-area">
          {user ? (
            <>
              <span>{user.email}</span>
              <button onClick={() => auth.signOut()}>Sign out</button>
            </>
          ) : (
            <Link to="/auth">Sign in / Register</Link>
          )}
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/pastpapers" element={<PastPapers />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/music" element={<MusicMaker />} />
        </Routes>
      </main>
    </div>
  );
}