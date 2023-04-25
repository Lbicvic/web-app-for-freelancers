const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    aproxFinishTime:{
        type: Number,
        required: true,
        default: 0
    },
    cost:{
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("service", serviceSchema);