let userdata = [];

const adduser = (ev) =>{
    ev.preventDefault();

    let x = document.forms["myForm"]["fname"].value;
    let y = document.forms["myForm"]["lname"].value;
    let z = document.forms["myForm"]["email"].value;
    let w = document.forms["myForm"]["pwd"].value;

  if (x == "") {
    document.getElementById("fn").innerHTML = "(First Name must be filled out)";
    return false;
  }
  if (y == "") {
    document.getElementById("ln").innerHTML = "(Last Name must be filled out)";
    return false;
  }if (z == "") {
    document.getElementById("em").innerHTML = "(Email id must be filled out)";
    return false;
  }if (w == "") {
    document.getElementById("pd").innerHTML = "(Password must be filled out)";
    return false;
  }

    let data = {
        FirstName : document.getElementById('fname').value,
        LastName : document.getElementById('lname').value,
        Email : document.getElementById('email').value,
        Password : document.getElementById('pwd').value,
    }

    userdata.push(data);

    //display userdata
    //console.log({userdata});

    //save to local storage
    localStorage.setItem('allusrs' , JSON.stringify(userdata));

    document.getElementById("success-msg").innerHTML = "Account created successdully";
    document.getElementById("signup-form").reset();

    setInterval(()=>{
        document.getElementById("success-msg").style.display = "none";
    },5000)
}

function login(){
    var logemail = document.getElementById("emailid").value;
    var pwd1 = document.getElementById("password").value;

    var email = localStorage.getItem("allusrs");
    var dat = JSON.parse(localStorage.getItem('allusrs'));

    let notmatch ;

    for(let i=0;i<= email[i].length;i++){
        console.log(dat[i].Email);
        var email1 = dat[i].Email;
        var pwd = dat[i].Password;
        if(logemail == email1 && pwd1 == pwd){
        //   alert("Logged in successfully");
        window.location  = "game.html"
            //window.location.replace("game.html");
            notmatch = false;
            break;
        }else{
            notmatch = true;
            console.log(notmatch);
            break;
        }
    }
    if(notmatch){
        alert("Wrong email password combination");
    }
   
}

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

    
    document.getElementById("signup-btn").addEventListener("click" , adduser);
})
