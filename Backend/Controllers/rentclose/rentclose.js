const Machine = require("../../Models/Machine.js");
const UserMachine = require("../../Models/UserMachine.js");
const MachineRequest = require("../../Models/MachineRequest.js");
const ActiveRental = require("../../Models/ActiveRental.js");

//close all the active rent connections

const rentclose = async (req, resp) => {
  const { machineid, ownerid, renterid } = req.body;

  try {
    const machinestatus = await Machine.updateOne(
      { _id: machineid },
      {
        $set: {
          status: true,
        },
      }
    );
    const activeclose = await ActiveRental.deleteOne({ machineid });

    const owneruser = await UserMachine.find({ userid: ownerid });

    const singleowner = owneruser[0];
    const ownermachinesownedlist = singleowner.owned;
    ownermachinesownedlist.forEach((item) => {
      if (item.machineid === machineid) {
        item.status = true;
      }
    });

    const ownermachinestatus = await UserMachine.updateOne(
      { userid: ownerid },
      {
        $set: {
          owned: ownermachinesownedlist,
        },
      }
    );

    const renteruser = await UserMachine.find({ userid: renterid });

    const singlerenter = renteruser[0];

    const renterrequestmachinelist = singlerenter.rented;
    renterrequestmachinelist.forEach((item) => {
      if (item.machineid === machineid) {
        item.requeststatus = "Closed";
      }
    });

    //console.log(renterrequestmachinelist);

    const renterrequest = await UserMachine.updateOne(
      { userid: renterid },
      {
        $set: {
          rented: renterrequestmachinelist,
        },
      }
    );

    resp
      .status(200)
      .json({ status: "true", message: "Rent Connection Closed Successfully" });
  } catch (err) {
    console.log(err);
    resp
      .status(500)
      .json({ status: "false", message: err.response.data.message });
  }
};

module.exports = { rentclose };
