const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MachineSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    shortdescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    rentamount: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    sellerid: {
      type: String,
    },
  },
  { timestamps: true }
);

const Machine = mongoose.model("machines", MachineSchema);
module.exports = Machine;
