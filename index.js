const express = require("express")
require('dotenv').config()
//  // // All routes importing here
const router = require("./src/route")


// // // new commit for check
const app = express()

app.use(express.json({extended : true}))

app.use(express.urlencoded({extended : true}))

app.use(express.static(process.cwd() + "/public"))

app.use( "/" , router)


const port = 3000
app.listen( port , ()=>{console.log("App is runing at " + port)})




