// alert("ok")


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


let themeChangeBtnClicked = false


function themeChange(){

    themeChangeBtnClicked = !themeChangeBtnClicked

    // // // Inner text of btn changes according to click
    if(themeChangeBtnClicked){
        document.getElementById("dark").innerText = "Light"         // // // InnerText of dark btn

        // // // Dark btn style ------>
        document.getElementById("dark").style.backgroundColor = "#fff"
        document.getElementById("dark").style.color = "black"

        // // // Theme color decid(New color) ---->
        document.querySelector(":root").style.setProperty('--ligth_pink', '#7df7f9fc');
    }else{
        document.getElementById("dark").innerText = "Dark"         // // // InnerText of dark btn

        // // // Dark btn style ------>
        document.getElementById("dark").style.backgroundColor = "black"
        document.getElementById("dark").style.color = "#fff"
        
        // // // Theme color decid(Back to normal color) ---->
        document.querySelector(":root").style.setProperty('--ligth_pink', '#f2cbcb');
    }

    // console.log(themeChangeBtnClicked)
    // console.log(document.getElementById("dark").value)

    
    // // // class name toggle in body -------------->
    let body = document.body;
    body.classList.toggle("dark_mode");

    // // // class nam etoggle b/w two divs ----------->
    let innerDiv1 = document.getElementsByClassName("inner")[0]
    let innerDiv2 = document.getElementsByClassName("inner")[1]

    // console.log(innerDiv1)
    innerDiv1.classList.toggle("dark_inner_div")
    innerDiv2.classList.toggle("dark_inner_div")

    // // // so getElementsByClassName() will give us list of elements , if more then one is present
    // // // Then we need to decide which i want to cahnge
    // // // give !improtant , if dark css is not applied.
    
}





// // // GO to top btn show on perticular scrool value --->


let myScrollFunc = function () {
    let y = window.scrollY;
  
    if(y > 200.0){
        document.getElementById("goto_top").style.visibility = "visible"
    }else{
        document.getElementById("goto_top").style.visibility = "hidden"
    }
};

window.addEventListener("scroll", myScrollFunc);






// // // contect me form code here ------------------------>

async function contectFormSubmit() {

    try {


        let name = document.getElementById("name").value.trim()
        let email = document.getElementById("email").value.trim()
        let message = document.getElementById("message").value.trim()

        // alert(name + email + message +"Let's submit")

        if (!name || !email || !message) {
            return alert(`Improtant field is missing (All fields should given)`)
        }

        // // // validation of email here ------------>
        // // Check email by regex ---------->

        if(!nameRejex.test(name)) return alert(`${name} :- Given name is incorrect`)

        if(!emailRjex.test(email)) return  alert(`${email} :- Given Email is  incorrect.`)




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

// // OTP btn clicked (should clicked only once)(Send OTP btn clicked or not)
let clicked = false

// // // 120 seconds for verify otp ---> 
let time = 120

// // // This var stored when otp sended from fronted and checked this value on backend
let when = ""

// // // This var will store setInterval value in send otp section and clear once 120s over or otp is valid.
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
            return alert("Email is not given.")
        }

        if(!emailRjex.test(email)){
            return alert(`${email} :- Given Email is not correct.`)
        }


        // // OTP btn clicked (should clicked only once)(below code should below after all validations )
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

            // // // enable or disable = false for otp
            document.getElementById("otp_input").disabled = false

            // // // enable or disable = false for email
            document.getElementById("email_otp").disabled = true



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
        alert(e.message)
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

                
        if(!otp){
            return alert("OTP is not given")
        }

        if(otp.length !== 6){
            return alert("OTP must in 6 digit only")
        }


        if(!otpRejex.test(otp)){
            return alert(`${otp} :- Given OTP is not correct.`)
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

            // // // Css and text for timmer div
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


