const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: String, enum: ["plastic", "paper", "e-waste"], required: true },
  points: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Submission", SubmissionSchema);
