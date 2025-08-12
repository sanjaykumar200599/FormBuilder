//Basic form
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: String,
  questionText: String,
  questionImage: String,
  options: [mongoose.Schema.Types.Mixed],
  answer: mongoose.Schema.Types.Mixed,
});

const formSchema = new mongoose.Schema({
  title: String,
  headerImage: String,
  questions: [questionSchema],
}, { timestamps: true });

module.exports = mongoose.model("Form", formSchema);
