const router = require("express").Router()



const { post_contact_form } = require("../controller/post_form_controller")
const { sendOTP, verifyOTP, getAllSendedAndVerifyVals, expireOTP } = require("../controller/opt")


router.get("/", (req, res) => {
    // console.log("Get request")
    res.sendFile("./index.html")
})


// // // // remove slash (/) in last from white list end points.
// let whiteList = ["https://working-with-nodemailer.onrender.com", "https://ashish-portfolio-three.vercel.app", "http://localhost:3000" ]
// const corsOptions = {
//     origin: function (origin, callback) {

//         // console.log(origin)

//         if (whiteList.indexOf(origin) !== -1) {
//             // console.log(1)
//             callback(null, true)
//         } else {
//             // console.log(2)
//             return callback(new Error("Not Allowed by CORS"))
//         }
//     }
// }



// function corsMiddleWare(req , res , next){

//     try{
//         cors(corsOptions)
//         next()
//     }catch(e){
//         req.status(500).send({data:'CORS error'})
//         return console.log(e)
//     }

// }





// // contect form Api ----->
router.post("/contect-form" , post_contact_form)


// // // OTP Api ---------->
router.get("/allValuesAre", getAllSendedAndVerifyVals)             // // // Get how many otp sended and how many verified Api. 
router.post("/sendOTP", sendOTP)             // // // Send OTP Api. 
router.post("/verifyOTP", verifyOTP)             // // // Verify OTP Api. 
router.get("/expireOTP:when", expireOTP)             // // // Delete OTP by tempstamp Api. 








module.exports = router