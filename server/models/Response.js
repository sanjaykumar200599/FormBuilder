const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  formId: mongoose.Schema.Types.ObjectId,
  answers: [mongoose.Schema.Types.Mixed],
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Response", responseSchema);
