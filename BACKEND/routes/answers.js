const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET answers for a specific question
router.get("/:questionId", (req, res) => {
  const { questionId } = req.params;
  db.query(
    "SELECT answers.*, users.username FROM answers JOIN users ON answers.user_id = users.id WHERE question_id = ? ORDER BY created_at ASC",
    [questionId],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: "Failed to fetch answers" });
      res.json(result);
    },
  );
});

// POST a new answer
router.post("/", (req, res) => {
  const { question_id, user_id, answer } = req.body;
  console.log("Answer POST received:", req.body);
  if (!question_id || !user_id || !answer)
    return res.status(400).json({ error: "All fields required" });

  db.query(
    "INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?)",
    [question_id, user_id, answer],
    (err, result) => {
      if (err) {
        console.log("Answer insert error:", err);
        return res.status(500).json({ error: "Failed to post answer" });
      }
      res.json({ message: "Answer posted successfully" });
    },
  );
});

module.exports = router;
