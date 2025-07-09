const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAffiliate: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  greenPoints: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", UserSchema);
