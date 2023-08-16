const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const surveySchema = new Schema(
  {
    answer1: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
    answer2: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
    answer3: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
    answer4: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
    answer5: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("survey", surveySchema);
