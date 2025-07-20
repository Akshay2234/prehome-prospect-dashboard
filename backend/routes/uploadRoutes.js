const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

// POST /api/upload
router.post("/", upload.single("image"), (req, res) => {
  try {
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl: filePath });
  } catch (err) {
    res.status(500).json({ error: "Image upload failed" });
  }
});

module.exports = router;
