const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Step 1: Setup CORS and JSON body parsing
app.use(cors({
  origin: "http://localhost:5174", // Your frontend's origin
  credentials: true
}));
app.use(express.json());

// ✅ Step 2: Import and use routes (AFTER middleware setup)
const adminAuthRoutes = require('./routes/adminAuth');
const adminRoutes = require("./routes/adminRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/auth");
const sessionRoutes = require("./routes/sessionRoutes");
const chatRoutes = require("./routes/chatRoutes");
const formRoutes = require("./routes/formRoutes");
const activityRoutes = require("./routes/activityRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/form", formRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add this line to register the upload route
app.use("/api/upload", uploadRoutes);
// ✅ Step 3: Connect MongoDB
mongoose
  .connect("mongodb+srv://pre_home:pre1234home@cluster0.qsxrc.mongodb.net/prehome", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Step 4: Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
