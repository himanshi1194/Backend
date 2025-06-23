const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const uploadDocument = require("../controllers/docController");
const document = require("../models/Document")

router.post("/upload", auth, upload.single("pdf"), uploadDocument);
router.get("/", auth, async (req,res)=>{
    try {
        const docs = await document.find({user:req.user}).sort({uploadedAt: -1})
        res.json(docs)
    } catch (error) {
        res.status(500).json({ msg:"Server error"})
    }
})


module.exports = router;