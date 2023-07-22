const router = require("express").Router()

const {post_contact_form} = require("../controller/post_form_controller")
const {sendOTP , verifyOTP , getAllSendedAndVerifyVals , expireOTP} = require("../controller/opt")


router.get("/" , (req,res)=>{
    // console.log("Get request")
    res.sendFile("./index.html")
})



// // contect form Api ----->
router.post("/contect-form" , post_contact_form)


// // // OTP Api ---------->
router.get("/allValuesAre" , getAllSendedAndVerifyVals)
router.post("/sendOTP" , sendOTP)
router.post("/verifyOTP" , verifyOTP)
router.get("/expireOTP:when" , expireOTP)








module.exports = router