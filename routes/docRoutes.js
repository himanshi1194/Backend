const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const uploadDocument = require("../controllers/docController");
const document = require("../models/Document");
const authMiddleware = require("../middleware/authMiddleware");
const Doc = require("../models/Document");
const fs = require("fs");
const path = require("path");

router.post("/upload", auth, upload.single("pdf"), uploadDocument);
router.get("/", auth, async (req, res) => {
  try {
    const docs = await document
      .find({ user: req.user })
      .sort({ uploadedAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});
// DELETE /api/docs/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.id);
    if (!doc) return res.status(404).json({ msg: "Document not found" });

    // ✅ Optional: Restrict delete to the uploader
    if (doc.user.toString() !== req.user)
      return res
        .status(403)
        .json({ msg: "Not authorized to delete this document" });

    // 🗑️ Delete file from filesystem
    const filePath = path.join(__dirname, "../", doc.filepath);
    fs.unlink(filePath, (err) => {
      if (err) console.warn("File delete warning:", err.message);
    });

    // ❌ Delete DB entry
    await Doc.findByIdAndDelete(req.params.id);

    res.json({ msg: "Document deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ msg: "Server error while deleting" });
  }
});

module.exports = router;
