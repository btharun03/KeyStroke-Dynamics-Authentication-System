const express = require("express");
const { processKeystroke } = require("../controllers/keystrokeController");
const router = express.Router();

router.post("/analyze", processKeystroke);

module.exports = router;
