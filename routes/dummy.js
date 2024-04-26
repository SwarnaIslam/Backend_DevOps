const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.json({ status: "ok" });
});
module.exports = router;
