const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/feedbackDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

const feedbackSchema = new mongoose.Schema({
  studentName: String,
  course: String,
  rating: Number,
  comments: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

app.post("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.json({ message: "Feedback submitted successfully!", feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));