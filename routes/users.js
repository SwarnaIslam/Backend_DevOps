const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.API_SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", quote: user.quote });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Invalid token" });
  }
});
router.post("/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.API_SECRET_KEY);
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invalid token" });
  }
});
module.exports = router;
