const Machine = require("../../Models/Machine.js");
const UserMachine = require("../../Models/UserMachine.js");
const MachineRequest = require('../../Models/MachineRequest.js');

//Creating a renting Request

const rentrequest =  async(req,resp)=>{

    const {machineid,status,userid,username,machinename,bidamount,tenure}=req.body;
    try{
            const isrequestavailable = await MachineRequest.find({machineid});
            if(!isrequestavailable)
            {
                const requests = {userid:userid,username:username,bidamount:bidamount,tenure:tenure};
                const newrequest= new MachineRequest({
                    machineid,
                    machinename,
                    status,
                    requests
                });
                await newrequest.save();
            }
    }
    catch(err)
    {
        console.log(err);
        resp.status(500).json({status:'false',message:err.response.data.message});
    }

}




module.exports = {rentrequest};