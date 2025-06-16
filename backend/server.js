const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const propertyRoutes = require("./routes/propertyRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/properties", propertyRoutes);

// Connect MongoDB
mongoose.connect("mongodb+srv://pre_home:pre1234home@cluster0.qsxrc.mongodb.net/prehome", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
