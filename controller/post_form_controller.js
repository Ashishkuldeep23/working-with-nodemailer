
const transport = require("../config/nodemailer")






const post_contact_form = async function (req, res) {
    try {

        console.log("start sending ..............")

        const { name, email, subject, message } = req.body;

        // console.log(req.body)

        if(!name || !email || !subject || !message){
            return res.status(400).send({status : false , message : "improtant field missing"})
        }



        const mailOptions = {
            from: email,
            to: 'ashishkuldeep6@gmail.com',
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        }

        await transport.sendMail(mailOptions, function (err, info) {

            if (err) {
                console.log(err)
                return res.status(400).send({ status: false, message: err })
            } else {
                console.log(info.response)
                return res.status(200).send({ status: true, message: 'Message sent successfully , Thankyou for sending email , Admin will respond you soon.' })
            }

        })

        // return res.status(200).send({status  : true , message : "Post new contect"})
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }

}


module.exports = { post_contact_form }