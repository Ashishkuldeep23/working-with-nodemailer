const transport = require("../config/nodemailer")          // // Importing nodemailter config function. 


const fs = require("fs")


// // // This code will genrate 6 digit otp --->
function genrateOTP() {
    let otp = ""
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10)
    }

    return otp
}



// // // Some variables to store information -------->
let storedOTP = []


// {
//     "totelSendedOTPsAre" : 0 ,
//     "totelVerifiedOTPsAre" : 0
// }

let path = __dirname + "//data.json"


// // // // update otp code ---------->

async function updateDataInJsonFile(keyName) {

    // console.log(path)

    let data = await fs.readFileSync(path, { encoding: 'utf8', flag: 'r+' })

    // console.log(data)    // // // geting data in from of json

    let newData = JSON.parse(data)   // // // Storing that data in other var

    newData[keyName]++      // // // Increasing value of given key in params

    // console.log(newData)


    // let update = newData[keyName]

    // console.log(update)



    await fs.writeFile(path, JSON.stringify(newData), (err) => {
        if (err) {
            throw err
        }
        console.log("updated")

    })

    // // // Writing same file with different obj recently created 

}





// // // Change data.json with actual data on every code push from localhost --> 

// // // Get all previous otp data code ------>

async function getAllSendedAndVerifyVals(req, res) {
    try {



        // updateDataInJsonFile("totelSendedOTPsAre")   // // checking here

        // let loadDataOfJsonFile

        // fs.readFile( path , (err, data) => {
        //     // Catch this!
        //     if (err) throw err;

        //     console.log(data)

        //     loadDataOfJsonFile =  JSON.parse(data);
        //     console.log(loadDataOfJsonFile);
        // });


        let data = await fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })

        let newData = JSON.parse(data)

        res.status(200).send({ status: true, data: { ...newData } })

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })

    }
}




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

        storedOTP.push({ [now]: true, otp: realOTP })

        setTimeout(() => {
            storedOTP.shift()
        }, 1000 * 120)


        // console.log(storedOTP)
        // console.log(storedOTP.length)


        // // // Senting otp on mail ----------->

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: `${realOTP} sended using nodemailer.`,
            text: `OTP from Ashish's website is :- ${storedOTP[storedOTP.length - 1].otp} .`
        }


        await transport.sendMail(mailOptions, function (err, info) {

            if (err) {
                console.log(err)
                return res.status(400).send({ status: false, message: err })
            } else {
                // console.log(info.response)

                updateDataInJsonFile("totelSendedOTPsAre")


                return res.status(200).send({ status: true, message: 'Check your mail, OTP sended successfully', data: now })
            }

        })

        // res.send(storedOTP)

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })

    }

}





// // // Verify opt code ------------->

const verifyOTP = async function (req, res) {
    try {

        let otp = req.body.otp
        let when = req.body.when

        if (!otp || !when) {
            return res.status(400).send({ status: false, message: "Field missing" })
        }

        // console.log(storedOTP)

        let sended = false          // // // This variable used to see a request sended or not (inside loop) ------> 

        for (let i = 0; i < storedOTP.length; i++) {

            let element = storedOTP[i]

            if (element[when]) {

                if (otp === element.otp) {
                    // totelVerifiedOTPsAre++


                    updateDataInJsonFile("totelVerifiedOTPsAre")


                    sended = true
                    return res.status(200).send({ status: true, message: "OTP matched" })
                } else {
                    sended = true
                    return res.status(400).send({ status: false, message: "OTP not matched" })
                }

            }
        }


        if (!sended) {
            return res.status(400).send({ status: false, message: "OTP not present or expired" })
        }


    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })

    }


}



module.exports = { sendOTP, verifyOTP, getAllSendedAndVerifyVals }
