const mongoose = require("mongoose")

const sendedOTP = new  mongoose.Schema({
    howMany : Number
} , {timestamps : true})


module.exports = mongoose.model( "sendOTP" , sendedOTP)
