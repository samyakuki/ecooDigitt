const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const ngoRoutes = require("./routes/ngo");
const adminRoutes = require("./routes/admin"); // ✅ Renamed mount path

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/adminpanel", adminRoutes); // ✅ safer than /api/admin

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));
