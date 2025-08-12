// backend/routes/formRoutes.js
const express = require("express");
const router = express.Router();
const Form = require("../models/Form");
const Response = require("../models/Response");

// ✅ Create a new form
router.post("/", async (req, res) => {
  try {
    const { title, headerImage, questions } = req.body;

    // Basic validation
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: "Form title is required" });
    }
    if (!Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ error: "Form must have at least one question" });
    }

    // Validate each question
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.id || !q.type || !q.questionText) {
        return res
          .status(400)
          .json({ error: `Question ${i + 1} is missing required fields` });
      }
    }

    const form = new Form({
      title: title.trim(),
      headerImage: headerImage || null, // allow null
      questions,
    });

    await form.save();
    res.status(201).json(form);
  } catch (err) {
    console.error("❌ Error saving form:", err.message);
    console.error(err.stack);
    // Send full mongoose validation error to client in dev mode
    res.status(500).json({
      error: "Server error while saving form",
      details: err.errors ? err.errors : err.message,
    });
  }
});

// ✅ Get form by ID
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.json(form);
  } catch (err) {
    console.error("❌ Error fetching form:", err.message);
    res.status(500).json({ error: "Server error while fetching form" });
  }
});

// ✅ Submit a form response
router.post("/:id/responses", async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res
        .status(400)
        .json({ error: "Answers must be a non-empty array" });
    }

    // Ensure all answers have a questionId
    for (let i = 0; i < answers.length; i++) {
      if (!answers[i].questionId) {
        return res
          .status(400)
          .json({ error: `Answer ${i + 1} is missing questionId` });
      }
    }

    const response = new Response({
      formId: req.params.id,
      answers,
    });

    await response.save();
    res.status(201).json({ message: "Response submitted successfully" });
  } catch (err) {
    console.error("❌ Error submitting response:", err.message);
    res
      .status(500)
      .json({ error: "Server error while submitting response" });
  }
});

module.exports = router;
