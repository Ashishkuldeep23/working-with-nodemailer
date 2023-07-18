const express = require("express")
require('dotenv').config()

// // // Mongoose here (only one model to how many otp sended  and how many verified-->)

const mongoose = require("mongoose") 

mongoose.connect("mongodb+srv://ashishkuldeep23:RAPXp7lktCcf8jBm@cluster0.xtascce.mongodb.net/OTP" , {

})
.then(()=>{ console.log("MongoDB connected") } )
.catch((err)=>{console.log(err)})


//  // // All routes importing here
const router = require("./src/route")


const app = express()

app.use(express.json({extended : true}))

app.use(express.urlencoded({extended : true}))

app.use(express.static(process.cwd() + "/public"))

app.use( "/" , router)


const port = 3000
app.listen( port , ()=>{console.log("App is runing at " + port)})




