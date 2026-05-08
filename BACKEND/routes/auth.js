const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(400).json({ error: "User already exists" });
        res.json({ message: "Registered successfully" });
      },
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "All fields required" });

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err || result.length === 0)
        return res
          .status(401)
          .json({ success: false, message: "Invalid login" });

      const validPassword = await bcrypt.compare(password, result[0].password);
      if (!validPassword)
        return res
          .status(401)
          .json({ success: false, message: "Invalid login" });

      const token = jwt.sign(
        { id: result[0].id, username: result[0].username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      res.json({
        success: true,
        token,
        username: result[0].username,
        userId: result[0].id, // add this line
      });
    },
  );
});

module.exports = router;
