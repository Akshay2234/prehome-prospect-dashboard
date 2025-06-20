// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/auth");
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes Setup
app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);

// Connect MongoDB
mongoose.connect("mongodb+srv://pre_home:pre1234home@cluster0.qsxrc.mongodb.net/prehome", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
