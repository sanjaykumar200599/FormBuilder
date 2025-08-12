// backend/models/form.js
const mongoose = require("mongoose");

// Question Schema
const questionSchema = new mongoose.Schema({
  id: { type: String, required: true }, // match frontend Question.id
  type: {
    type: String,
    enum: ["categorize", "cloze", "comprehension"],
    required: true
  },
  questionText: { type: String, default: "" },
  questionImage: { type: String, default: "" },

  // For "categorize"
  categories: { type: [String], default: [] },
  options: { type: [String], default: [] },

  // For "cloze"
  passage: { type: String, default: "" },
  blanks: { type: [String], default: [] },

  // For "comprehension"
  questions: {
    type: [{ question: String, answer: String }],
    default: []
  }
});

// Form Schema
const formSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    headerImage: { type: String, default: "" },
    questions: { type: [questionSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);
