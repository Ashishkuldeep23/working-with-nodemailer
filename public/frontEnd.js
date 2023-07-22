// alert("ok")


/* 

Notes are : - 
1) toggle of class by getting element in js.
2) Toggle by js var value as true.
3) Show div on some scroll value
4) Get element by class will give you arr of element then you should know where you going to change something.
*/


// // // Some improtant rejex are ---------->

let emailRjex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
let nameRejex = /^[A-Za-z\ss]{1,35}$/
let otpRejex = /^[0-9]+$/





// // // Below is not working becuz two div is present with same class name , see the next function code -->

// function themeChange(){
//     themeChangeBtnClicked++
//     if(themeChangeBtnClicked%2 !== 0){

//         document.getElementById("body").style.backgroundColor = "black";
//         document.getElementById("body").style.color = "white";

//         document.getElementsByClassName("inner").style.backgroundColor="black"
//     }else{

//         document.getElementById("body").style.backgroundColor = "white";
//         document.getElementById("body").style.color = "black";

//         document.getElementsByClassNamex(".inner").style.backgroundColor="white"


//     }

// }

// // // Now i'm going to do same thing with true and false ---->
// let themeChangeBtnClicked = 0


// // // ***************************************************** Theme change function **************************************

let themeChangeBtnClicked = false

function themeChange() {

    themeChangeBtnClicked = !themeChangeBtnClicked

    // // // Inner text of btn changes according to click
    if (themeChangeBtnClicked) {
        document.getElementById("dark").innerText = "Light"         // // // InnerText of dark btn

        // // Style of btn done by css style , see .dark_mode class.
        // // // Dark btn style ------>
        // document.getElementById("dark").style.backgroundColor = "#fff"
        // document.getElementById("dark").style.color = "black"

        // // // Theme color decid(New color) ---->
        document.querySelector(":root").style.setProperty('--ligth_pink', '#7df7f9fc');
    } else {
        document.getElementById("dark").innerText = "Dark"         // // // InnerText of dark btn

        // // Style of btn done by css style , see .dark_mode class.
        // // // Dark btn style ------>
        // document.getElementById("dark").style.backgroundColor = "black"
        // document.getElementById("dark").style.color = "#fff"

        // // // Theme color decid(Back to normal color) ---->
        document.querySelector(":root").style.setProperty('--ligth_pink', '#f2cbcb');
    }

    // console.log(themeChangeBtnClicked)
    // console.log(document.getElementById("dark").value)


    // // // class name toggle in body -------------->
    let body = document.body;
    body.classList.toggle("dark_mode");


    // // // Below funcinality achived by css giving more style inside dark mode class and use it. see the css file and .dark_mode class


    // // // // class nam etoggle b/w two divs ----------->
    // let innerDiv1 = document.getElementsByClassName("inner")[0]
    // let innerDiv2 = document.getElementsByClassName("inner")[1]

    // // console.log(innerDiv1)
    // innerDiv1.classList.toggle("dark_inner_div")
    // innerDiv2.classList.toggle("dark_inner_div")

    // // // so getElementsByClassName() will give us list of elements , if more then one is present
    // // // Then we need to decide which i want to cahnge
    // // // give !improtant , if dark css is not applied.

}







// // // GO to top btn show on perticular scrool value --->
// // // ***************************************************** Window scroll btn visibility **************************************

let myScrollFunc = function () {
    let y = window.scrollY;

    if (y > 200.0) {
        document.getElementById("goto_top").style.visibility = "visible"
    } else {
        document.getElementById("goto_top").style.visibility = "hidden"
    }
};

window.addEventListener("scroll", myScrollFunc);








// // // ***************************************************** Contact handler function **************************************

// // // Some Enter hadlers -------->

// // Name ---->
document.getElementById("name_contact").addEventListener( "keydown" , function(e){
    // console.log(e)
    if(e.code === "Enter"){document.getElementById("email_contact").focus()}
} )

// // Email ---->
document.getElementById("email_contact").addEventListener( "keydown" , function(e){
    // console.log(e)
    if(e.code === "Enter"){document.getElementById("message_contact").focus()}
} )

// // MEssage ---->
document.getElementById("message_contact").addEventListener( "keydown" , function(e){
    // console.log(e)
    if(e.code === "Enter"){contectFormSubmit()}
} )




// // // Actual contect form handler code here ------------------------>

async function contectFormSubmit() {

    try {

        let name = document.getElementById("name_contact").value.trim()
        let email = document.getElementById("email_contact").value.trim()
        let message = document.getElementById("message_contact").value.trim()

        // alert(name + email + message +"Let's submit")

        if (!name || !email || !message) {
            return alert(`Improtant field is missing (All fields should given)`)
        }

        // // // validation of email here ------------>
        // // Check email by regex ---------->

        if (!nameRejex.test(name)) return alert(`${name} :- Given name is incorrect, Only alphabets are allowed`)

        if (!emailRjex.test(email)) return alert(`${email} :- Given Email is  incorrect.`)

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

            document.getElementById("name_contact").value = ""
            document.getElementById("email_contact").value = ""
            document.getElementById("message_contact").value = ""

            alert(data.message)

        }

    } catch (e) {
        console.log(e)
        alert(e.message)
    }

}




// // // ***************************************************** OTP related code here  **************************************


// // // Some Enter hadlers -------->

document.getElementById("email_otp").addEventListener( "keydown" , function(e){
    if(e.code === "Enter") {
        
        sendOTP();  

        document.getElementById("otp_input").disabled = false
        document.getElementById("otp_input").focus()
    }
} )


document.getElementById("otp_input").addEventListener( "keydown" , function(e){
    if(e.code === "Enter") {
        verifyOTP();
    }
} )




// // // ************************* Send OTP **************

// // // OTP code here ------------------------>

// // OTP btn clicked (should clicked only once)(Send OTP btn clicked or not)
let clicked = false

// // // 120 seconds for verify otp ---> 
let time = 120

// // // This var stored when otp sended from fronted and checked this value on backend
let when = ""

// // // This var will store setInterval value in send otp section and clear once 120s over or otp is valid.
let interval = ''



// // // send otp ----------> 

async function sendOTP() {
    try {


        if (clicked) {
            return
        }

        let email = document.getElementById("email_otp").value.trim()

        // console.log(email)

        if (!email) {
            return alert("Email is not given.")
        }

        if (!emailRjex.test(email)) {
            return alert(`${email} :- Given Email is not correct.`)
        }


        // // OTP btn clicked (should clicked only once)(below code should below after all validations )
        clicked = true

        // // // Showing timer ------->

        document.getElementById("timer").style.visibility = "visible"

        // // // validation of email here ------------>
        // // Check email by regex ---------->


        let body = {
            email: email
        }

        let option = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }

        }


        let request = await fetch("/sendOTP", option)

        let data = await request.json()

        // console.log(data)

        if (!data.status) {
            console.log(data.message)
            alert(data.message)
        } else {
            allSendedAndVerifiedOTP()    // // // function for get data how many otp sended


            document.getElementById("timer").style.animation = "time 0.5s infinite alternate"
            // console.log(data)

            // // // Set when otp created
            when = data.data

            // // // enable or disable = false for otp
            document.getElementById("otp_input").disabled = false

            // // // enable or disable = false for email
            document.getElementById("email_otp").disabled = true



            // // // setInterval or timer for checking ------------>
            interval = setInterval( async () => {
                let newTime = time - 1
                document.getElementById("timer").innerText = `${newTime}s`
                time = newTime

                if (time < 0) {
                    document.getElementById("timer").style.animation = ""
                    document.getElementById("timer").innerText = "Try again"
                    document.getElementById("timer").style.color = "darkred"
                    alert("OTP expried")
                    clearInterval(interval)

                    // document.getElementById("otp_input").value = ""
                    document.getElementById("otp_input").disabled = true

                    // // Email null value ---------->
                    document.getElementById("email_otp").value = "Timeout, Refresh page for again send otp."
                    document.getElementById("email_otp").style.color = "darkred"
                    document.getElementById("email_otp").disabled = true



                    // // send a request for otp expired by using API when ------>
                    // console.log(when)

                    let req = await fetch(`/expireOTP${when}`)      // //  // Get call then not need to use option object
                    let data = await req.json()

                    // console.log(data)

                    if(data.status){
                        console.log(data.message)
                    }else{
                        alert(data.message)
                    }

                    
                }

            }, 1000)


            return
        }

    } catch (e) {
        console.log(e)
        alert(e.message)
    }

}



// // // verify otp ----------> 
// // // ************************* Verify OTP **************


let isProcessDone = false

async function verifyOTP() {
    try {

        if (!clicked) {
            return alert("Send OTP  first")
        }

        if (isProcessDone) {
            return alert("Refresh page for again send otp.")
        }

        // console.log(when)

        let otp = document.getElementById("otp_input").value.trim()

        // console.log(otp.length)


        if (!otp) {
            return alert("OTP is not given")
        }

        if (!otpRejex.test(otp)) {
            return alert(`${otp} :- Given OTP is not correct. Only numbers are allowed`)
        }

        if (otp.length !== 6) {
            return alert("OTP must in 6 digit only")
        }


        let body = {
            otp, when
        }


        let option = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }

        }


        let request = await fetch("/verifyOTP", option)

        let data = await request.json()

        if (!data.status) {
            console.log(data)
            alert(data.message)
        } else {

            clearInterval(interval)     // // // Clearing interval of timer

            allSendedAndVerifiedOTP()    // // // function for get data how many otp sended

            // // // Css and text for timmer div
            document.getElementById("timer").style.animation = ""
            document.getElementById("timer").innerText = "Matched"
            document.getElementById("timer").style.color = "darkgreen"
            document.getElementById("timer").style.fontSize = "2rem"

            // document.getElementById("otp_input").value = ""
            document.getElementById("otp_input").disabled = true

            // // Email null value ---------->
            document.getElementById("email_otp").value = "Matched, Refresh page for again send otp."
            document.getElementById("email_otp").style.color = "darkgreen"
            document.getElementById("email_otp").disabled = true

            // // process done -------------->
            isProcessDone = true

            console.log(data.message)
            return alert(data.message)
        }




    } catch (e) {
        console.log(e)
        alert(a.message)
    }
}



// // // ************************ How many send and how many verified **************

async function allSendedAndVerifiedOTP() {

    try {


        let request = await fetch("/allValuesAre")

        let data = await request.json()

        // console.log(json)

        if (!data.status) {
            console.log(data)
            alert(data.message)
        } else {
            // console.log(data.data)
            console.log("OTP number updated.")
            document.getElementById("otp_sended_num").innerText = data.data.totelSendedOTPsAre
            document.getElementById("otp_verified_num").innerText = data.data.totelVerifiedOTPsAre
        }


    } catch (e) {
        console.log(e)
        alert(e.message)
    }

}



// // // function called once window refresh ----------->
allSendedAndVerifiedOTP()    // // // function for get data 