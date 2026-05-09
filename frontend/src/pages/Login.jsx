import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "https://middleearthqa-backend.onrender.com/api/auth/login",
        {
          username,
          password,
        },
      );
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("userId", res.data.userId);
        navigate("/dashboard");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>⚔️ Middle-Earth Q&A</h1>
        <h2 style={styles.subtitle}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.button} type="submit">
            Enter Middle-Earth
          </button>
        </form>
        <p style={styles.registerText}>
          No account?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register here
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
    height: "100vh",
    backgroundColor: "#1a1a2e",
  },
  box: {
    backgroundColor: "#16213e",
    padding: "40px",
    borderRadius: "10px",
    width: "350px",
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
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
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
  },
  error: {
    color: "#ff6b6b",
    marginBottom: "10px",
    fontSize: "14px",
  },
  registerText: {
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

export default Login;
