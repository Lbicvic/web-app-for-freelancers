const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    aproxFinishTime: {
      type: Number,
      required: true,
      default: 0,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["design", "development", "marketing", "business"],
    },
    user_id: {
      type: String,
      required: true,
    },
    user_name:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("service", serviceSchema);
