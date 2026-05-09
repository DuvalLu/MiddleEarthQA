const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all questions for a specific category
// Joins with users table to include the username of the question author
// Results are ordered chronologically (oldest first)
router.get("/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  db.query(
    "SELECT questions.*, users.username FROM questions JOIN users ON questions.user_id = users.id WHERE category_id = ? ORDER BY created_at ASC",
    [categoryId],
    (err, result) => {
      // Return error if database query fails
      if (err)
        return res.status(500).json({ error: "Failed to fetch questions" });
      // Return questions as JSON
      res.json(result);
    },
  );
});

// POST a new question to a category
router.post("/", (req, res) => {
  const { user_id, category_id, title, question } = req.body;

  // Validate that all required fields are provided
  if (!user_id || !category_id || !title || !question)
    return res.status(400).json({ error: "All fields required" });

  // Insert the new question into the database
  db.query(
    "INSERT INTO questions (user_id, category_id, title, question) VALUES (?, ?, ?, ?)",
    [user_id, category_id, title, question],
    (err, result) => {
      // Return error if insert fails
      if (err)
        return res.status(500).json({ error: "Failed to post question" });
      res.json({ message: "Question posted successfully" });
    },
  );
});

module.exports = router;
