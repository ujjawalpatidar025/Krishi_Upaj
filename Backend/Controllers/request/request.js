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
        resp
          .status(400)
          .json({
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

    if (bidamount > rentamount) {
        console.log("x");
      const amountupdateresponse = await Machine.updateOne(
        { _id: machineid },
        {
          $set: {
            rentamount:bidamount,
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

const rentaccept = async(req,resp)=>{

    const {machineid , ownerid ,renterid ,bidamount,tenure} = req.body;

    try{

        const machineresponse = await Machine.updateOne({_id:machineid},
            {
                $set:{
                    status:false
                }
            }
            );

       



    }
    catch(err)
    {
        console.log(err);
        resp.status(500).json({status:'false',message:err.response.data.message});
    }

}

module.exports = { rentrequest ,rentaccept};
