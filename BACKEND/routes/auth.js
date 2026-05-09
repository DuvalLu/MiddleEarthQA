const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// REGISTER - creates a new user account
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate that all fields are provided
  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  try {
    // Hash the password before storing - never store plain text passwords
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err, result) => {
        // If username or email already exists, return error
        if (err) return res.status(400).json({ error: "User already exists" });
        res.json({ message: "Registered successfully" });
      },
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN - authenticates a user and returns a JWT token
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate that all fields are provided
  if (!username || !password)
    return res.status(400).json({ error: "All fields required" });

  // Look up user by username
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      // If user not found or query error, return generic invalid login message
      if (err || result.length === 0)
        return res
          .status(401)
          .json({ success: false, message: "Invalid login" });

      // Compare submitted password against the stored hashed password
      const validPassword = await bcrypt.compare(password, result[0].password);
      if (!validPassword)
        return res
          .status(401)
          .json({ success: false, message: "Invalid login" });

      // Generate a JWT token valid for 1 day
      const token = jwt.sign(
        { id: result[0].id, username: result[0].username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      // Return token and user info to the client
      res.json({
        success: true,
        token,
        username: result[0].username,
        userId: result[0].id,
      });
    },
  );
});

module.exports = router;
