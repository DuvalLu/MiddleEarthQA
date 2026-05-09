import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Main App component - sets up client-side routing for the single page application
function App() {
  return (
    // BrowserRouter enables navigation between pages without full page reloads
    <Router>
      <Routes>
        {/* Login page - default route */}
        <Route path="/" element={<Login />} />
        {/* Registration page */}
        <Route path="/register" element={<Register />} />
        {/* Dashboard - main forum page, only accessible after login */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
