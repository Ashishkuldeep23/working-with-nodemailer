

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// // Some Js prectice --------------->
// let check = {
//     name: "ashish",
//     fname: "kumar",
//     a: "A",
//     b: "B",
//     c: "C"
// }


// // console.log(check.name)

// // check.fname = "Kuldeep"

// // console.log(check.fname)
// // let a = (check.fname) ? "Ok": "OK2"
// // console.log(a)

// console.log(check)

// let a = Object.entries(check)
// console.log(a)

// a.shift()
// console.log(a)

// // // // By this way we cane make object from arr (arr is object.entries)
// let y = a.reduce((acc, elem) => {
//     acc[elem[0]] = elem[1] // or what ever object you want inside
//     return acc
// }, {})

// console.log(y)

// check = y

// console.log(check)





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // // Making salt function to send otp on frontEnd ------>
// // Experiment

// let now = Date.now()
// console.log(now.toString().length)
// let str = now.toString()

// let prefix = str.slice(0 , 4)
// console.log(prefix)
// let sufix = str.slice(10)
// console.log(sufix)

// let otp = 123456

// let sendOTP = prefix + otp + sufix

// console.log(sendOTP)




// // // Making function salt to add timeStamp in actual otp ----->
// // Actual fn

// function salt (start = 0 , end = 13){
//     // let now = Date.now()
//     // let strOfNow =  Date.now().toString()
//     return  Date.now().toString().slice(start , end)

// }

// // let z = salt()
// let z1 = salt(0,4)
// // let z2 = salt(4,10)
// let z3= salt(10 , 13)

// // console.log(z)
// console.log(z1)
// // console.log(z2)
// console.log(z3)



// // // Send Otp and Verify Otp  (new ting verify of frontend) -------------------->

function genrateOTP() {
    let otp = ""
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10)
    }
    return otp
}


function salt(start = 0 , end = 13){
    // let now = Date.now()
    // let strOfNow =  Date.now().toString()
    return  Date.now().toString().slice(start , end)

}


let otpIs = genrateOTP()

function saltedOtp (){

    // let send =  salt(0,4) + otpIs + salt(10 )
    // let prefix = salt(0,4)
    // let otp =  otpIs
    // let sufix = salt(10 , 13)
    // console.log(prefix , otp , sufix)
    // let send = prefix + otp + sufix


    return salt(0,4) + otpIs + salt(10 )
}

let sendedToFEOtp = saltedOtp()

console.log(otpIs)

console.log(sendedToFEOtp)



// // // this function will present on  *** frontEnd  ***  
function takeOutOtp(sendedToFEOtp){

    console.log(otpIs)
    return sendedToFEOtp.slice(4,10)
  
}

console.log(takeOutOtp(sendedToFEOtp))





// // // Convert Array to object (ES6 of JS) ---->
// // Simplest way ------->
let arr = ['rupa' , 'ram' , "kali"]
let obj = {...arr}
console.log(obj)









