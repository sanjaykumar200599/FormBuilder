require("dotenv").config(); // 👈 Load env variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/forms", formRoutes);

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
