const Machine = require("../../Models/Machine.js");
const UserMachine = require("../../Models/UserMachine.js");
const MachineRequest = require('../../Models/MachineRequest.js');

// Add machines Controller

const addMachine = async (req, resp) => {
  const { _id, title, type, shortdescription, description, year, rentamount } =
    req.body;

  try {
    if (
      !title ||
      !type ||
      !shortdescription ||
      !description ||
      !year ||
      !rentamount
    )
      resp
        .status(400)
        .json({ status: "false", message: "Fill all the Necessary Details" });

    const machine = new Machine({
      sellerid: _id,
      title,
      type,
      shortdescription,
      description,
      year,
      rentamount,
      image: "",
      status: true,
    });

    await machine.save();
    // console.log(machine);
    if (!machine)
      resp
        .status(500)
        .json({ status: "false", message: "Internal Server Error" });

    const isCreated = await UserMachine.findOne({ userid: _id });
    // console.log(isCreated);
    const owned = [
      {
        machineid: machine._id,
        machinename: machine.title,
      },
    ];
    if (!isCreated) {
      const createdMachine = new UserMachine({
        userid: _id,
        owned,
      });
      await createdMachine.save();
    } else {
      const response = await UserMachine.updateOne(
        { userid: _id },
        {
          $push: {
            owned: {
              machineid: machine._id,
              machinename: machine.title,
            },
          },
        }
      );
    }

    resp
      .status(200)
      .json({ status: "true", message: "Machine Added Successfully" });
  } catch (err) {
    console.log(err);
    resp
      .status(500)
      .json({ status: "false", message: err.response.data.message });
  }
};

//Update status Machines

const updateStatus = async (req, resp) => {
  const { _id, status } = req.body;
  try {
    var newStatus;
    if (status == false) {
      newStatus = true;
    } else {
      newStatus = false;
    }

    const response = await Machine.updateOne(
      { _id },
      {
        $set: {
          status: newStatus,
        },
      }
    );

    if (!response) {
      resp
        .status(400)
        .json({ status: "false", message: "Internal Server Error" });
    }
    resp
      .status(200)
      .json({ status: "true", message: "Machine Status Updated Successfully" });
  } catch (err) {
    console.log(err);
    resp
      .status(500)
      .json({ status: "false", message: err.response.data.message });
  }
};

//update Amount controller

const updateAmount = async (req, resp) => {
  const { _id, rentamount } = req.body;
  try {
    const response = await Machine.updateOne(
      { _id },
      {
        $set: {
          rentamount,
        },
      }
    );

    if (!response) {
      resp
        .status(400)
        .json({ status: "false", message: "Internal Server Error" });
    }
    resp
      .status(200)
      .json({ status: "true", message: "Machine Amount Updated Successfully" });
  } catch (err) {
    console.log(err);
    resp
      .status(500)
      .json({ status: "false", message: err.response.data.message });
  }
};

module.exports = { addMachine, updateStatus, updateAmount };
