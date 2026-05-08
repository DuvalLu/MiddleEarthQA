const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET questions by category
router.get("/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  db.query(
    "SELECT questions.*, users.username FROM questions JOIN users ON questions.user_id = users.id WHERE category_id = ? ORDER BY created_at ASC",
    [categoryId],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: "Failed to fetch questions" });
      res.json(result);
    },
  );
});

// POST a new question
router.post("/", (req, res) => {
  const { user_id, category_id, title, question } = req.body;
  if (!user_id || !category_id || !title || !question)
    return res.status(400).json({ error: "All fields required" });

  db.query(
    "INSERT INTO questions (user_id, category_id, title, question) VALUES (?, ?, ?, ?)",
    [user_id, category_id, title, question],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: "Failed to post question" });
      res.json({ message: "Question posted successfully" });
    },
  );
});

module.exports = router;
