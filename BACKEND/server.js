const express = require("express");
const cors = require("cors");
require("dotenv").config(); // load .env variables

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const questionRoutes = require("./routes/questions"); // fix: plural to match answers route naming
const answerRoutes = require("./routes/answers"); // don't forget answers!

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
