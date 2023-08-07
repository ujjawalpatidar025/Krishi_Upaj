const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MachineRequestSchema = new Schema(
  {
    machineid: {
      type: String,
    },
    machinename: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    requests: [
      {
        userid: {
          type: String,
        },
        username: {
          type: String,
        },
        bidamount: {
          type: Number,
        },
        tenure: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const MachineRequest = mongoose.model(
  "machinerequestslists",
  MachineRequestSchema
);
module.exports = MachineRequest;
