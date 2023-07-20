const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserMachineSchema = new Schema(
  {
    userid:{
        type:String,
        defualt:'',
    },
    owned: [
        {
          machineid:{
            type:String,
          },
          machinename:{
            type:String,

          }
        },
      ],
      rented:[
        {
          machineid:{
            type:String,
          },
          machinename:{
            type:String,

          }
        },
      ]
  },
  { timestamps: true }
);

const UserMachine = mongoose.model("usermachines", UserMachineSchema);
module.exports = UserMachine;
