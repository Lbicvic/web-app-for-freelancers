const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    hire: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["accept", "refuse", "completed", "ongoing"],
    },
    freelancer_id: {
      type: String,
      required: true,
    },
    freelancer_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("application", applicationSchema);
