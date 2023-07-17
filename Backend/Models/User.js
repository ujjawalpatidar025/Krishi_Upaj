const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    pincode: {
      type: Number,
      default: 0,
    },
    phonenumber: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);
module.exports = User;
