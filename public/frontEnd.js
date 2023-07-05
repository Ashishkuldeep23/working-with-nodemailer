// alert("ok")




// // // contect me form code here ------------------------>

async function contectFormSubmit() {

    try {


        let name = document.getElementById("name").value.trim()
        let email = document.getElementById("email").value.trim()
        let message = document.getElementById("message").value.trim()

        // alert(name + email + message +"Let's submit")

        if (!name || !email || !message) {
            return alert(`Improtant field missing `)
        }

        // // // validation of email here ------------>
        // // Check email by regex ---------->





        let body = {
            name: name,
            email: email,
            message: message,
            subject: "New contect me form posted"
        }

        // console.log(body)

        let option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        let request = await fetch("/contect-form", option)

        let data = await request.json()

        // console.log(data)

        if (data.status === false) {
            console.log(data)
            alert(data.message)
        } else {
            console.log(data)
            
            document.getElementById("name").value = ""
            document.getElementById("email").value = ""
            document.getElementById("message").value = ""

            alert(data.message)

        }


    } catch (e) {
        alert(a.message)
    }

}




// // // OTP code here ------------------------>

let time = 120
let clicked = false
let when = ""

let interval = ''



// // // send otp ----------> 

async function sendOTP(){
    try{


        if(clicked){
            return
        }

        let email = document.getElementById("email_otp").value.trim()

        // console.log(email)

        if(!email){
            return alert("Email is not given")
        }

        // // Send otp btn clicked
        clicked = true

        // // // Showing timer ------->

        document.getElementById("timer").style.visibility = "visible"

        // // // validation of email here ------------>
        // // Check email by regex ---------->


        let body = {
            email : email
        }

        let option = {
            method : "POST" ,
            body : JSON.stringify(body) , 
            headers : {
                'Content-Type': 'application/json'
            }

        }


        let request = await fetch("/sendOTP" , option)

        let data = await request.json()

        // console.log(data)

        if(!data.status){
            console.log(data.message)
            alert(data.message)
        }else{
            document.getElementById("timer").style.animation = "time 0.5s infinite alternate"
            // console.log(data)

            // // // Set when otp created
            when = data.data

            // // // enable or disable = false for input
            document.getElementById("otp_input").disabled = false


            interval = setInterval( ()=>{
                let newTime = time-1
                document.getElementById("timer").innerText = `${newTime}s`
                time = newTime

                if(time < 0){
                    document.getElementById("timer").style.animation = ""
                    document.getElementById("timer").innerText = "try again"
                    document.getElementById("timer").style.color = "darkred"
                    alert("OTP expried")
                    clearInterval(interval)
                }

            }  , 1000)


            return
        }



    
    } catch (e) {
        alert(a.message)
    }

}



// // // verify otp ----------> 


let isProcessDone = false

async function verifyOTP(){
    try{

        if(!clicked){
            return alert("Send OTP  first")
        }

        if(isProcessDone){
            return
        }

        // console.log(when)

        let otp = document.getElementById("otp_input").value.trim()

        // console.log(otp.length)

        if(otp.length !== 6){
            return alert("OTP must in 6 digit only")
        }

        
        if(!otp){
            return alert("OTP is not given")
        }


        let body = {
            otp , when
        }

        
        let option = {
            method : "POST" ,
            body : JSON.stringify(body) , 
            headers : {
                'Content-Type': 'application/json'
            }

        }


        let request = await fetch("/verifyOTP" , option)

        let data = await request.json()

        if(!data.status){
            console.log(data)
            alert(data.message)
        }else{

            clearInterval(interval)

            document.getElementById("timer").style.animation = ""
            document.getElementById("timer").innerText = "Matched"
            document.getElementById("timer").style.color = "darkgreen"
            document.getElementById("timer").style.fontSize = "2rem"

            // document.getElementById("otp_input").value = ""
            document.getElementById("otp_input").disabled = true

            // // Email null value ---------->
            document.getElementById("email_otp").value = "Done, Refresh page for again send otp."
            document.getElementById("email_otp").disabled = true

            // // process done -------------->
            isProcessDone = true

            console.log(data.message)
            return alert(data.message)
        }



    
    } catch (e) {
        alert(a.message)
    }
}


