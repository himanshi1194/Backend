const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  signer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pageNumber: {
    type: Number,
    required: true,
  },
  xCoordinate: {
    type: Number,
    required: true,
  },
  yCoordinate: {
    type: Number,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "signed"],
    default: "pending",
  }, 
  createdAt: { type: Date, default: Date.now },
  font: {
    type: String,
    default: "cursive",
  },
});

module.exports = mongoose.model("Signature", signatureSchema);
