const { spawn } = require("child_process");

exports.processKeystroke = async (req, res) => {
  try {
    const { username, timingData } = req.body;
    
    const pythonProcess = spawn("python", ["ml/keystroke_model.py", JSON.stringify(timingData)]);

    pythonProcess.stdout.on("data", (data) => {
      res.json({ prediction: data.toString().trim() });
    });

  } catch (err) {
    res.status(500).json({ message: "Error processing keystroke", error: err.message });
  }
};