const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    leadid: {
      type: String,

      trim: true,
    },
    customer: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    email: {
      type: String,

      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    value: {
      type: String,
      trim: true,
    },
    tags: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      trim: true,
    },
    assigned: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);
module.exports = Lead;
