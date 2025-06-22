const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const uploadDocument = require("../controllers/docController");

router.post("/upload", auth, upload.single("pdf"), uploadDocument);

module.exports = router;