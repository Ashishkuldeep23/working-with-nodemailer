

let storedOTP = []

function genrateOTP() {
    let otp = ""

    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10)
    }

    return otp
}



const transport = require("../config/nodemailer")


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
                return res.status(200).send({ status: true, message: 'Check your mail, OTP sended successfully', data: now })
            }

        })

        // res.send(storedOTP)

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })

    }

}



const verifyOTP = async function (req, res) {
    try {

        let otp = req.body.otp
        let when = req.body.when

        if (!otp || !when) {
            return res.status(400).send({ status: false, message: "Field missing" })
        }

        // console.log(storedOTP)

        let sended = false

        for (let i = 0; i < storedOTP.length; i++) {

            let element = storedOTP[i]

            if (element[when]) {

                if (otp === element.otp) {
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



module.exports = { sendOTP, verifyOTP }