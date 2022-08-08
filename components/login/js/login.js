let userdata = [];
let notmatch ;
var profile = [];

//SIGNUP FUNCTION
const adduser = (ev) =>{
    ev.preventDefault();

    let x = document.forms["myForm"]["fname"].value;
    let y = document.forms["myForm"]["lname"].value;
    let z = document.forms["myForm"]["email"].value;
    let w = document.forms["myForm"]["password"].value;

  if (x == "") {
    document.getElementById("fn").innerHTML = "(First Name must be filled out)";
    return false;
  }
  if (!/^[a-zA-Z]*$/g.test(x)) {
    document.getElementById("fn").innerHTML = "(Please enter valid name)";
    return false;
}
  if (y == "") {
    document.getElementById("ln").innerHTML = "(Last Name must be filled out)";
    return false;
  }
  if (!/^[a-zA-Z]*$/g.test(y)) {
    document.getElementById("ln").innerHTML = "(Please enter valid name)";
    return false;
}
if (z == "") {
    document.getElementById("em").innerHTML = "(Email id must be filled out)";
    return false;
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(z)) {
    document.getElementById("em").innerHTML = "(Please enter valid email id)";
    return false;
}


if (w == "") {
    document.getElementById("pd").innerHTML = "(Password must be filled out)";
    return false;
  }


    let data = {
        FirstName : document.getElementById('fname').value,
        LastName : document.getElementById('lname').value,
        Email : document.getElementById('email').value,
        Password : document.getElementById('password').value,
        score:0,
        level:0,
        id:Math.floor(Math.random() * 100),
    }

    userdata.push(data);

    //save to local storage
    localStorage.setItem('allusrs' , JSON.stringify(userdata));

    document.getElementById("success-msg").classList.add("show");
    document.getElementById("success-msg").innerHTML = "Account created successfully";
    document.getElementById("signup-form").reset();

    setInterval(()=>{
        document.getElementById("success-msg").style.display = "none";
    },5000)
}

//LOGIN FUNCTION
function login(){
    var logemail = document.getElementById("email1").value;
    var pwd1 = document.getElementById("password1").value;

    var email = localStorage.getItem("allusrs");
    var dat = JSON.parse(localStorage.getItem('allusrs'));

    for(let i=0;i<= email[i].length;i++){
        var email1 = dat[i].Email;
        var pwd = dat[i].Password;
        var id = dat[i].id;
        if(logemail == email1 && pwd1 == pwd){
            
          window.location  = "game/html/game.html";

            let currentdata = {
              username : dat[i].FirstName + " " + dat[i].LastName,
              useremail : logemail,
              id: id
            }
            profile.push(currentdata);

            localStorage.setItem('currentuser' , JSON.stringify(profile));
              notmatch = false;
            break;
         }
         else{
          notmatch = true;
         }
    }

    if(notmatch){
        alert("Wrong email password combination");
        document.getElementById("login-form").reset();
    }
}


//SHOW/HIDE FORMS
document.addEventListener("DOMContentLoaded",()=>{
    var loginForm = document.getElementById("login-form");
    var signupForm = document.getElementById("signup-form");

    document.querySelector("#createform").addEventListener("click", e =>{
    e.preventDefault();
    loginForm.classList.add("hide-form");
    signupForm.classList.remove("hide-form");
    })

    document.querySelector("#login").addEventListener("click", e =>{
        e.preventDefault();
        signupForm.classList.add("hide-form");
        loginForm.classList.remove("hide-form");
        })


    document.querySelector(".signup").addEventListener("click" , adduser);
})
