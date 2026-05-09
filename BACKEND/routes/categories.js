const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all categories - used to populate the sidebar menu on the dashboard
router.get("/", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    // Return error if database query fails
    if (err)
      return res.status(500).json({ error: "Failed to fetch categories" });
    // Return all categories as JSON
    res.json(result);
  });
});

module.exports = router;
