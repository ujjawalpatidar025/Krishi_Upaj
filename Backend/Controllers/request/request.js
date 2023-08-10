const Machine = require("../../Models/Machine.js");
const UserMachine = require("../../Models/UserMachine.js");
const MachineRequest = require("../../Models/MachineRequest.js");
const ActiveRental = require("../../Models/ActiveRental.js");

//Creating a renting Request

const rentrequest = async (req, resp) => {
  const {
    machineid,
    status,
    userid,
    username,
    machinename,
    bidamount,
    tenure,
    rentamount,
  } = req.body;
  try {
    if (!bidamount || !tenure)
      resp.status(400).json({
        status: "false",
        message: "All necessary fields are required",
      });
    const isrequestavailable = await MachineRequest.find({ machineid });

    if (isrequestavailable.length) {
      let flag = 0;
      let requestlist = isrequestavailable[0].requests;
      requestlist.forEach((item) => {
        if (item.userid == userid) {
          flag = 1;
        }
      });

      if (flag) {
        resp.status(400).json({
          status: "false",
          message: "You already requested for the machine",
        });
      } else {
        const response = await MachineRequest.updateOne(
          { machineid },
          {
            $push: {
              requests: {
                userid,
                username,
                bidamount,
                tenure,
              },
            },
          }
        );
      }
    } else {
      const requests = {
        userid: userid,
        username: username,
        bidamount: bidamount,
        tenure: tenure,
      };
      const newrequest = new MachineRequest({
        machineid,
        machinename,
        status,
        requests,
      });
      await newrequest.save();
    }
    const availableUserMachine = await UserMachine.find({ userid });
   
    if (availableUserMachine.length!=0) {
      const usermachine = await UserMachine.updateOne(
        { userid },
        {
          $push: {
            rented: {
              machineid,
              machinename,
              requeststatus: "Pending",
            },
          },
        }
      );
    } else {
     
      const rented = [
        {
          machineid,
          machinename,
          requeststatus: "Pending",
        },
      ];
      const newUserMachine = new UserMachine({
        userid,
        rented: rented,
      });
      
      await newUserMachine.save();
    }

    if (bidamount > rentamount) {
      const amountupdateresponse = await Machine.updateOne(
        { _id: machineid },
        {
          $set: {
            rentamount: bidamount,
          },
        }
      );
    }

    resp
      .status(200)
      .json({ status: "true", message: "Rent Request Send Successfully" });
  } catch (err) {
    console.log(err);
    resp
      .status(500)
      .json({ status: "false", message: err.response.data.message });
  }
};

// Rent Accept Controller

const rentaccept = async (req, resp) => {
  const { machineid, ownerid, renterid, bidamount, tenure } = req.body;

  try {
    const machineresponse = await Machine.updateOne(
      { _id: machineid },
      {
        $set: {
          status: false,
        },
      }
    );

    const activeRequest = new ActiveRental({
      machineid,
      owner: ownerid,
      renter: renterid,
      bidamount,
      tenure,
      rentstatus: "Active",
    });
    await activeRequest.save();

    const machinerequestlist = await MachineRequest.deleteOne({ machineid });

    const renteruser = await UserMachine.find({ userid: renterid });

    const singlerenter = renteruser[0];

    const renterrequestmachinelist = singlerenter.rented;
    renterrequestmachinelist.forEach((item) => {
      if (item.machineid === machineid) {
        item.requeststatus = "Accepted";
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

    const owneruser = await UserMachine.find({ userid: ownerid });

    const singleowner = owneruser[0];
    const ownermachinesownedlist = singleowner.owned;
    ownermachinesownedlist.forEach((item) => {
      if (item.machineid === machineid) {
        item.status = false;
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

    const updatebidamount = await Machine.updateOne(
      { _id: machineid },
      {
        $set: {
          rentamount: bidamount,
        },
      }
    );

    resp.status(200).json({
      status: "true",
      message: "Request Accepted Successfully",
      activeRequest,
    });
  } catch (err) {
    console.log(err);
    resp
      .status(500)
      .json({ status: "false", message: err.response.data.message });
  }
};

//Get active Rent with machine ID

const getactiverental = async (req, resp) => {
  try {
    const { machineid } = req.body;
    const activerentdata = await ActiveRental.find({ machineid });
   
    if (activerentdata.length===0) {
      
      resp
        .status(401)
        .json({ status: "false", message: "Rent data not found" });
    }
    else
    {
    resp.status(200).json({
      status: "true",
      message: "Data fetched Successfully",
      activerentdata,
    });
  }
  } catch (err) {
    console.log(err);
    resp
      .status(500)
      .json({ status: "false", message: err.response.data.message });
  }
};


//get Machine requests cotroller

const getMachineRequests = async(req,resp)=>{
  const {machineid}=req.body;
  try{
    const machineRequests = await MachineRequest.find({machineid});
    if(machineRequests.length==0)
    {
      resp.status(401).json({status:'false',message:'No requests till yet'});
    }
    else{
      resp.status(200).json({status:'true',message:"Data Fetched Successfully",machineRequests});
    }

  }
  catch(err)
  {
    console.log(err);
    resp.status(500).json({status:'false',message:err.response.data.message});
  }
}







module.exports = { rentrequest, rentaccept, getactiverental,getMachineRequests };
