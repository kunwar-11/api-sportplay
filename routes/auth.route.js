const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");

router.route("/signup").post(async (req, res) => {
  const user = req.body;
  try {
    const checkUser = await User.findOne({ email: user.email });
    if (checkUser) {
      return res.status(403).json({
        success: false,
        message: "User Already Exist , Login To continue",
      });
    }
    const NewUser = new User(user);
    const salt = await bcrypt.genSalt(10);
    NewUser.password = await bcrypt.hash(NewUser.password, salt);
    await NewUser.save();
    res.status(201).json({ success: true, user: NewUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
