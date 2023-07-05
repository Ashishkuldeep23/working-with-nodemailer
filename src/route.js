const router = require("express").Router()

const {post_contact_form} = require("../controller/post_form_controller")
const {sendOTP , verifyOTP} = require("../controller/opt")


router.get("/" , (req,res)=>{
    // console.log("Get request")
    res.sendFile("./index.html")
})




router.post("/contect-form" , post_contact_form)

router.post("/sendOTP" , sendOTP)
router.post("/verifyOTP" , verifyOTP)








module.exports = router