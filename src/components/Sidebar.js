import React from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const TUTOR_NAV = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "students", label: "My Students", icon: "👥" },
  { id: "availability", label: "My Availability", icon: "🕐" },
  { id: "sessions", label: "Sessions", icon: "📅" },
  { id: "packages", label: "Class Packages", icon: "🎟️" },
  { id: "assignments", label: "Assignments", icon: "📝" },
  { id: "materials", label: "Study Materials", icon: "📚" },
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "payments", label: "Payments", icon: "💳" },
  { id: "progress", label: "Progress", icon: "📊" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
];

const STUDENT_NAV = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "assignments", label: "My Assignments", icon: "📝" },
  { id: "sessions", label: "Sessions", icon: "📅" },
  { id: "packages", label: "Class Packages", icon: "🎟️" },
  { id: "materials", label: "Study Materials", icon: "📚" },
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "payments", label: "Payments", icon: "💳" },
  { id: "progress", label: "My Progress", icon: "📊" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
];

const COLORS = ["#3d8ef0", "#38c9b0", "#f0a500", "#f05f7a", "#9b59b6"];

export default function Sidebar({ active, onNav, unreadCount = 0, unreadMessages = 0 }) {
  const { userProfile } = useAuth();
  const nav = userProfile?.role === "tutor" ? TUTOR_NAV : STUDENT_NAV;
  const color = COLORS[userProfile?.name?.charCodeAt(0) % COLORS.length] || "#3d8ef0";

  const logout = async () => {
    await signOut(auth);
    toast.success("Signed out successfully");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-row">
          <div className="logo-icon">🎓</div>
          <div>
            <h2>TutorTracker</h2>
            <span>{userProfile?.role === "tutor" ? "Tutor Portal" : "Student Portal"}</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {nav.map(item => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? "active" : ""}`}
            onClick={() => onNav(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.id === "notifications" && unreadCount > 0 && (
              <span style={{
                marginLeft: "auto", background: "#f05f7a", color: "white",
                borderRadius: "10px", padding: "1px 7px", fontSize: "11px", fontWeight: 700
              }}>{unreadCount}</span>
            )}
            {item.id === "messages" && unreadMessages > 0 && (
              <span style={{
                marginLeft: "auto", background: "#f05f7a", color: "white",
                borderRadius: "10px", padding: "1px 7px", fontSize: "11px", fontWeight: 700
              }}>{unreadMessages}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="user-avatar" style={{ background: color }}>
            {userProfile?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="user-info">
            <div className="name">{userProfile?.name}</div>
            <div className="role">{userProfile?.role}</div>
          </div>
          <button className="logout-btn" onClick={logout} title="Sign out">⏏</button>
        </div>
      </div>
    </div>
  );
}
