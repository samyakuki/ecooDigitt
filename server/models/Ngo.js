const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  website: String,
  contactEmail: String,
  approved: { type: Boolean, default: false },
});

module.exports = mongoose.model("NGO", ngoSchema);
