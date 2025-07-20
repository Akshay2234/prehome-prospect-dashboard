// routes/adminAuth.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // your Admin model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/admin/auth/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ email, password: hashed });
  await newAdmin.save();

  res.status(201).json({ message: "Admin registered successfully" });
});

// POST /api/admin/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ message: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id, role: "admin" }, "secret", { expiresIn: "1d" });
  res.json({ token });
});

module.exports = router;
