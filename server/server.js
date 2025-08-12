require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ MongoDB Connection
(async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is not set in .env");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop app if DB fails
  }
})();

// ✅ Routes
app.use("/api/forms", formRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
