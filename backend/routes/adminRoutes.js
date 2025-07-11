const express = require("express");
const router = express.Router();
const {
  addProperty,
  updateProperty,
  deleteProperty,
  deleteUser,
  getAllUsers,
  blockUser,
} = require("../controllers/adminController");
// In routes/adminRoutes.js
const UserActivity = require("../models/UserActivity");

router.get("/all-activities", async (req, res) => {
  try {
    const activities = await UserActivity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user activity" });
  }
});

router.post("/property", addProperty);
router.put("/property/:id", updateProperty);
router.delete("/property/:id", deleteProperty);

router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);
router.patch("/user/block/:id", blockUser); // ✅ toggle block/unblock

module.exports = router;
