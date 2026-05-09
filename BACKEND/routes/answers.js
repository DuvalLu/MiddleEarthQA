const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all answers for a specific question
// Joins with users table to include the username of the answer author
// Results are ordered chronologically (oldest first)
router.get("/:questionId", (req, res) => {
  const { questionId } = req.params;
  db.query(
    "SELECT answers.*, users.username FROM answers JOIN users ON answers.user_id = users.id WHERE question_id = ? ORDER BY created_at ASC",
    [questionId],
    (err, result) => {
      // Return error if database query fails
      if (err)
        return res.status(500).json({ error: "Failed to fetch answers" });
      // Return answers as JSON
      res.json(result);
    },
  );
});

// POST a new answer to a question
router.post("/", (req, res) => {
  const { question_id, user_id, answer } = req.body;

  // Validate that all required fields are provided
  if (!question_id || !user_id || !answer)
    return res.status(400).json({ error: "All fields required" });

  // Insert the new answer into the database
  db.query(
    "INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?)",
    [question_id, user_id, answer],
    (err, result) => {
      // Return error if insert fails
      if (err) return res.status(500).json({ error: "Failed to post answer" });
      res.json({ message: "Answer posted successfully" });
    },
  );
});

module.exports = router;
