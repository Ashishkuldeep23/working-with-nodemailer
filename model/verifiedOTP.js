const mongoose = require("mongoose")

const verifiedOTP = new  mongoose.Schema({
    howMany : Number
} , {timestamps : true})


module.exports = mongoose.model( "verifyOTP" , verifiedOTP)
