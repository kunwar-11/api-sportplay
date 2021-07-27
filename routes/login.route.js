const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
      }
    }
  } catch (error) {}
});
