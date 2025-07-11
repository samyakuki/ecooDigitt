const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const NGO = require("../models/Ngo");

// Get all NGOs (Admin only)
router.get("/ngos", auth, admin, async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json({ ngos });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Approve or reject NGO
router.patch("/ngo/:id", auth, admin, async (req, res) => {
  try {
    const { approved } = req.body; // approved: true or false
    const ngo = await NGO.findByIdAndUpdate(
      req.params.id,
      { approved },
      { new: true }
    );
    if (!ngo) return res.status(404).json({ message: "NGO not found" });
    res.json({ message: `NGO ${approved ? "approved" : "rejected"}`, ngo });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
