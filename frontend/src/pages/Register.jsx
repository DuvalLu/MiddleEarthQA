import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!agreed) newErrors.agreed = "You must agree to the terms";
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await axios.post(
        "https://middleearthqa-backend.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        },
      );
      if (res.data.message) {
        navigate("/");
      }
    } catch (err) {
      setErrors({ general: "Registration failed. User may already exist." });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>⚔️ Middle-Earth Q&A</h1>
        <h2 style={styles.subtitle}>Register</h2>
        <form onSubmit={handleRegister}>
          <div style={styles.fieldRow}>
            <input
              style={styles.input}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: "" }));
              }}
            />
            {errors.username && (
              <span style={styles.error}>{errors.username}</span>
            )}
          </div>

          <div style={styles.fieldRow}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          <div style={styles.fieldRow}>
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />
            {errors.password && (
              <span style={styles.error}>{errors.password}</span>
            )}
          </div>

          <div style={styles.fieldRow}>
            <input
              style={styles.input}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
            />
            {errors.confirmPassword && (
              <span style={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>

          <div style={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                setErrors((prev) => ({ ...prev, agreed: "" }));
              }}
            />
            <span
              style={{
                color: errors.agreed ? "#ff6b6b" : "#aaa",
                marginLeft: "8px",
              }}
            >
              I agree to the Terms of Middle-Earth
            </span>
          </div>
          {errors.agreed && <p style={styles.error}>{errors.agreed}</p>}
          {errors.general && <p style={styles.error}>{errors.general}</p>}

          <button style={styles.button} type="submit">
            Join the Fellowship
          </button>
        </form>
        <p style={styles.loginText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1a1a2e",
  },
  box: {
    backgroundColor: "#16213e",
    padding: "40px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    textAlign: "center",
  },
  title: {
    color: "#c9a84c",
    fontSize: "24px",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#fff",
    marginBottom: "20px",
  },
  fieldRow: {
    marginBottom: "15px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #c9a84c",
    backgroundColor: "#0f3460",
    color: "#fff",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#c9a84c",
    color: "#1a1a2e",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "#ff6b6b",
    fontSize: "12px",
    marginTop: "4px",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    textAlign: "left",
  },
  loginText: {
    color: "#aaa",
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#c9a84c",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Register;
