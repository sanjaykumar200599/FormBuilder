const express = require("express");
const router = express.Router();
const Form = require("../models/Form");
const Response = require("../models/Response");

// Create form
router.post("/", async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get form by ID
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.json(form);
  } catch (err) {
    res.status(404).json({ error: "Form not found" });
  }
});

// Submit form response
router.post("/:id/responses", async (req, res) => {
  try {
    const response = new Response({
      formId: req.params.id,
      answers: req.body.answers,
    });
    await response.save();
    res.status(201).json({ message: "Response submitted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
