// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Utility to extract keystroke features
const extractFeatures = (keystrokeData) => {
  const keyDownMap = {};
  const holdTimes = [];
  const flightTimes = [];

  keystrokeData.forEach((event, idx) => {
    if (event.event === "down") {
      keyDownMap[event.key + "-" + idx] = event.time;
    } else if (event.event === "up") {
      const downKey = Object.keys(keyDownMap).find(k => k.startsWith(event.key));
      if (downKey) {
        const downTime = keyDownMap[downKey];
        holdTimes.push(event.time - downTime);
        delete keyDownMap[downKey];
      }
    }
  });

  for (let i = 0; i < keystrokeData.length - 1; i++) {
    if (keystrokeData[i].event === "up" && keystrokeData[i + 1].event === "down") {
      flightTimes.push(keystrokeData[i + 1].time - keystrokeData[i].time);
    }
  }

  return [...holdTimes, ...flightTimes];
};

// Tolerant comparison function
const areKeystrokesSimilar = (features1, features2, tolerance = 150) => {
  const maxLength = Math.max(features1.length, features2.length);

  const padToLength = (arr, length) => {
    const avg = arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
    return [...arr, ...Array(length - arr.length).fill(avg)];
  };

  const padded1 = padToLength(features1, maxLength);
  const padded2 = padToLength(features2, maxLength);

  let totalDiff = 0;
  for (let i = 0; i < maxLength; i++) {
    totalDiff += Math.abs(padded1[i] - padded2[i]);
  }

  const avgDiff = totalDiff / maxLength;
  return avgDiff <= tolerance;
};

// Register Controller
exports.registerUser = async (req, res) => {
  try {
    const { username, email, phone, password, keystrokeData } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      keystrokeData,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login Controller
exports.loginUser = async (req, res) => {
  try {
    const { username, password, keystrokeData } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const storedFeatures = extractFeatures(user.keystrokeData);
    const currentFeatures = extractFeatures(keystrokeData);


    if (!areKeystrokesSimilar(storedFeatures, currentFeatures)) {
      return res.status(401).json({
        message: "Login denied: Your typing pattern doesn't match our records. Please try again more naturally."
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ success: true, token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
