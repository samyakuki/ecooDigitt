
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");
const Submission = require("../models/Submission");

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Toggle affiliate status
router.post("/toggle-affiliate", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.isAffiliate = !user.isAffiliate;
    await user.save();
    res.json({ message: `Affiliate mode ${user.isAffiliate ? "enabled" : "disabled"}` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Submit a recycling action
router.post("/submit", verifyToken, async (req, res) => {
  const { category } = req.body;

  const pointsMap = {
    plastic: 20,
    paper: 15,
    "e-waste": 30
  };

  const points = pointsMap[category];
  if (!points) return res.status(400).json({ message: "Invalid category" });

  try {
    const submission = new Submission({
      userId: req.user.id,
      category,
      points
    });
    await submission.save();

    // Add points to user
    const user = await User.findById(req.user.id);
    user.greenPoints += points;
    await user.save();

    res.json({ message: `${category} submitted! +${points} points`, greenPoints: user.greenPoints });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/submissions", verifyToken, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.id });
    res.json({ submissions });
  } catch (err) {
    res.status(500).json({ message: "Error fetching submissions" });
  }
});


module.exports = router;
