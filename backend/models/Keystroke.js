const mongoose = require("mongoose");

const KeystrokeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  timingData: { type: Array, required: true },
});

module.exports = mongoose.model("Keystroke", KeystrokeSchema);
