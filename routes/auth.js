const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/users");
const salt = Number(process.env.HASH_SALT);
router.post("/register", async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});
router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return { status: "error", error: "Invalid login" };
  }
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.API_SECRET_KEY,
      {
        expiresIn: 24 * 60 * 60,
      }
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

module.exports = router;
