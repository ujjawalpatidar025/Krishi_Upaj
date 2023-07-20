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
      type: Number,
    },
    rentstatus: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ActiveRental = mongoose.model("machinerequests", ActiveRentalSchema);
module.exports = ActiveRental;
