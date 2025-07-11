const express = require("express");
const router = express.Router();
const NGO = require("../models/Ngo");

// Register a new NGO
router.post("/register", async (req, res) => {
  try {
    const ngo = new NGO(req.body);
    await ngo.save();
    res.json({ message: "NGO submitted for approval!" });
  } catch (err) {
    res.status(500).json({ message: "Error registering NGO" });
  }
});

// Get all approved NGOs (for users)
router.get("/approved", async (req, res) => {
  const ngos = await NGO.find({ approved: true });
  res.json({ ngos });
});

module.exports = router;
