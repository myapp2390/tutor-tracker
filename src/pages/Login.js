import React, { useState } from "react";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import toast from "react-hot-toast";

export default function Login() {
  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setError(""); setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        toast.success("Welcome back!");
      } else {
        if (!form.name.trim()) { setError("Please enter your name."); setLoading(false); return; }
        const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
        await set(ref(db, `users/${cred.user.uid}`), {
          name: form.name,
          email: form.email,
          role: "student",
          createdAt: Date.now(),
          notifications: {}
        });
        toast.success("Account created!");
      }
    } catch (e) {
      const msgs = {
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/email-already-in-use": "This email is already registered.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/invalid-email": "Please enter a valid email address.",
      };
      setError(msgs[e.code] || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-mark">🎓</div>
          <h1>TutorTracker</h1>
          <p>Your shared learning workspace</p>
        </div>

        <div className="login-tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => { setMode("login"); setError(""); }}>Sign In</button>
          <button className={mode === "register" ? "active" : ""} onClick={() => { setMode("register"); setError(""); }}>Create Account</button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {mode === "register" && (
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" placeholder="e.g. John Smith" value={form.name} onChange={handle} />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} onKeyDown={e => e.key === "Enter" && submit()} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handle} onKeyDown={e => e.key === "Enter" && submit()} />
        </div>

        <button className="btn-primary" onClick={submit} disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </div>
    </div>
  );
}
