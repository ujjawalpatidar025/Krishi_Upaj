const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ActiveRentalSchema = new Schema(
  {
    machineid: {
      type: String,
    },
    owner: {
      type: String,
    },
    renter: {
      type: String,
    },
    bidamount: {
      type: Number,
    },
    tenure: {
      type: String,
    },
    rentstatus: {
      type: String,
      default: true,
    },
  },
  { timestamps: true }
);

const ActiveRental = mongoose.model("activerentalist", ActiveRentalSchema);
module.exports = ActiveRental;
