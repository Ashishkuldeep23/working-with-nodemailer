const transport = require("../config/nodemailer")          // // Importing nodemailter config function. 

// // // Improtant mongoose model here ---------->
const sendedModel = require("../model/sendedOTP")
const verifiedModel = require("../model/verifiedOTP")


// // // This code will genrate 6 digit otp --->
function genrateOTP() {
    let otp = ""
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10)
    }

    return otp
}



// // // Some variables to store information -------->
let storedOTP = {}


// // // ***************************************************** Send OTP here  **************************************
// // // Send opt code ------------->


const sendOTP = async function (req, res) {

    try {

        const email = req.body.email

        if (!email) {
            return res.status(400).send({ status: false, message: "Email is not given" })
        }


        let realOTP = genrateOTP()

        let now = Date.now()
        // console.log(now)

        // storedOTP.push({ [now]: true, otp: realOTP })


        // text: `OTP from Ashish's website is :- ${storedOTP[storedOTP.length - 1].otp} .`
        storedOTP[now] = realOTP    // // // Creating a key with timestamp and value is real Generated otp.

        // console.log(storedOTP)


        // // // Now stoped deleting otp by setTimeout.
        // setTimeout(() => {
        //     // storedOTP.shift()
        //     delete storedOTP[now]

        //     console.log(storedOTP)
        // }, 1000 * 120)


        // console.log(storedOTP) 
        // console.log(storedOTP.length)


        // // // Senting otp on mail ----------->

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: `${realOTP} sended using nodemailer.`,
            text: `OTP from Ashish's website is :- ${storedOTP[now]} .`
        }


        await transport.sendMail(mailOptions, async function (err, info) {

            if (err) {
                console.log(err)
                return res.status(400).send({ status: false, message: err })
            } else {
                // console.log(info.response)

                // // // Creating new sendedotp model here ------->
                sendedModel.create({ 'howMany': 1 }).then((result) => console.log(result)).catch((err) => { console.log(err) })

                return res.status(200).send({ status: true, message: 'Check your mail, OTP sended successfully', data: now })
            }

        })

        // res.send(storedOTP)

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })

    }

}




// // // ***************************************************** Verify OTP here  **************************************
// // // Verify opt code ------------->

const verifyOTP = async function (req, res) {
    try {

        let otpIs = req.body.otp
        let when = req.body.when

        if (!otpIs || !when) {
            return res.status(400).send({ status: false, message: "Field missing" })
        }

        // console.log(storedOTP)


        // let sended = false          // // // This variable used to see a request sended or not (inside loop) ------> 


        /*

        // // // Not storing data in arr of object 
        for (let i = 0; i < storedOTP.length; i++) {

            let element = storedOTP[i]

            if (element[when]) {

                if (otpIs === element.otp) {
                    
                    // // // Creating new verifyotp model here ------->
                    // // // On testing mode not sending to db
                    // verifiedModel.create({ 'howMany': 1 }).then((result) => console.log(result)).catch((err) => { console.log(err) })


                    sended = true
                    return res.status(200).send({ status: true, message: "OTP matched" })
                } else {
                    sended = true
                    return res.status(400).send({ status: false, message: "OTP not matched" })
                }

            }
        }

        // if (!sended) {
        //     return res.status(400).send({ status: false, message: "OTP not present or expired" })
        // }


        */


        console.log(storedOTP[when])

        if (storedOTP[when]) {

            if (otpIs === storedOTP[when]) {

                // // // Creating new verifyotp model here ------->
                verifiedModel.create({ 'howMany': 1 }).then((result) => console.log(result)).catch((err) => { console.log(err) })

                sended = true
                return res.status(200).send({ status: true, message: "OTP matched" })
            } else {
                sended = true
                return res.status(400).send({ status: false, message: "OTP not matched" })
            }

        } else {
            return res.status(400).send({ status: false, message: "OTP not present or expired" })

        }




    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })

    }


}

// // // ******************************************************************** Delete otp ********************************************************************


function expireOTP(req, res) {
    try {

        // console.log(req.params)
        // console.log(req.params.when)

        // // Working -------->
        const when = req.params.when
        delete storedOTP[when]


        // console.log( storedOTP)

        res.status(200).send({ status: true, message: "deleted" })

    } catch (err) {

        res.status(500).send({ status: false, message: err.message })
    }

}





// // // ***************************************************** Get all OTP's here  **************************************
// // // Get all previous otp data code ------>

async function getAllSendedAndVerifyVals(req, res) {
    try {

        // // // Periviously doing this ------------>

        // updateDataInJsonFile("totelSendedOTPsAre")   // // checking here
        // let loadDataOfJsonFile
        // fs.readFile( path , (err, data) => {
        //     // Catch this!
        //     if (err) throw err;

        //     console.log(data)

        //     loadDataOfJsonFile =  JSON.parse(data);
        //     console.log(loadDataOfJsonFile);
        // });
        // let data = await fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })


        // // // finding how many models are present with sended otp ----------->
        let findSendedOTPs = await sendedModel.find()

        // console.log(findSendedOTPs)


        // let newData = JSON.parse(data)


        // // // finding how many models are present with sended otp ----------->
        let findVeifiedOTPs = await verifiedModel.find()


        let data = {
            totelSendedOTPsAre: findSendedOTPs.length,
            totelVerifiedOTPsAre: findVeifiedOTPs.length
        }

        // console.log(data)

        res.status(200).send({ status: true, data: { ...data } })

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })

    }
}





module.exports = { sendOTP, verifyOTP, getAllSendedAndVerifyVals, expireOTP }
