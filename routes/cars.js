const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Cars = require("../models/cars");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.API_SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    const cars = await Cars.find().populate("owner").exec();

    return res.json({ status: "ok", cars: cars });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Invalid token" });
  }
});
router.get("/your-cars", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.API_SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    const cars = await Cars.find({ owner: user.id }).populate("owner").exec();

    return res.json({ status: "ok", cars: cars });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Invalid token" });
  }
});
router.post("/", upload.single("photo"), async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.API_SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    const file = req.file;
    // console.log(req.file.originalname);
    await Cars.create({
      price: req.body.price,
      photo: req.file.originalname,
      model: req.body.model,
      type: req.body.type,
      owner: user,
    });
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invalid token" });
  }
});
router.put("/:id", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.API_SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    const car = new Cars({
      price: req.body.price,
      photo: req.body.photo,
      model: req.body.model,
      color: req.body.color,
      type: req.body.type,
      owner: user.id,
      _id: req.params.id,
    });
    await Cars.findByIdAndUpdate(req.params.id, car, {});
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invalid token" });
  }
});
router.delete("/:id", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.API_SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    await Cars.findByIdAndDelete(req.params.id);
    return res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invalid token" });
  }
});
module.exports = router;
