const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cars = new mongoose.Schema(
  {
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String },
    type: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "cars" }
);

const model = mongoose.model("Cars", Cars);
module.exports = model;
