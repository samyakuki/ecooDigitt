const express = require("express");
const router = express.Router();
const Ngo = require("../models/Ngo");
const User = require("../models/User");

const auth = require("../middleware/authMiddleware"); // verifies token
const admin = require("../middleware/admin"); // verifies isAdmin

// ✅ GET all pending NGOs
router.get("/pending-ngos", auth, admin, async (req, res) => {
  try {
    const ngos = await Ngo.find({ approved: false });
    res.json({ ngos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch pending NGOs" });
  }
});

// ✅ Approve an NGO
router.post("/approve/:id", auth, admin, async (req, res) => {
  try {
    const updatedNgo = await Ngo.findByIdAndUpdate(req.params.id, { approved: true });
    if (!updatedNgo) return res.status(404).json({ message: "NGO not found" });
    res.json({ message: "NGO approved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while approving NGO" });
  }
});

// ✅ Reject/Delete an NGO
router.delete("/reject/:id", auth, admin, async (req, res) => {
  try {
    await Ngo.findByIdAndDelete(req.params.id);
    res.json({ message: "NGO rejected and removed." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while rejecting NGO" });
  }
});

// ✅ Get all users (optional feature)
router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = router;
