const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes")

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Routes  
app.use("/api/auth", authRoutes)
app.get("/", (req,res) =>{
  res.send("Api is running")
})


// Connect DB
mongoose.connect(process.env.MONGO_URI, {
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
