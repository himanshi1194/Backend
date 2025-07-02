const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const docRoutes = require("./routes/docRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
// server.js or app.js
const signatureRoutes = require("./routes/signature");
//Middleware
app.use(
  cors({
    origin: "https://melodious-sawine-21ea88.netlify.app/",
    credentials: true,  
  })
);
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/signed', express.static(path.join(__dirname, 'signed')));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/api/docs", docRoutes);
app.use("/api/signature", signatureRoutes);

// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error", err));

// Test route
app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
