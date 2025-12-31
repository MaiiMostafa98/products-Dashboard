
/* ------------------------------------------ REGISTER ------------------------------------- */

var fName = document.getElementById('fName');
var lName = document.getElementById('lName');
var email = document.getElementById('email');
var pass = document.getElementById('pass');

var users = [];

if (localStorage.getItem('users') != null) {
  users = JSON.parse(localStorage.getItem('users'));
} else {
  users = [];
}


// var currentUser = JSON.parse(localStorage.getItem('currentUser'));
// if(currentUser){
//     document.getElementById('welcome').innerHTML = `Welcome ${currentUser.firstName}`;
// }


function addUser(){

    if(fName.value.trim() === "" || lName.value.trim() === "" || email.value.trim() === "" || pass.value.trim() === ""){

        document.getElementById('alert').innerHTML = 'Please fill all fields';
        return; // وقف تنفيذ الفنكشن
    }


    for(var i = 0 ; i < users.length ; i++){
        if(users[i].userEmail.toLowerCase() === email.value.trim().toLowerCase()){
            document.getElementById('alert').innerHTML = 'this email already exist';
            document.getElementById('login').innerHTML = `
              <button id=""  onclick="registerForNewEmail()" class="btn btn-outline-success me-2 ">Register for New email</button>
              <button id=""  onclick="goToLogin()" class="btn btn-outline-success me-2 ">GO to Login</button>
              `
             return; 
        }
    }
    

    var user = {
   
        firstName : fName.value.trim() ,
        lastName : lName.value.trim() ,
        userEmail : email.value.trim() ,
        password : pass.value.trim(),

    }

    users.push(user);

    localStorage.setItem( 'users' , JSON.stringify( users ) );


   goToLogin()



    console.log(users);

    clearInputs()

}

function clearInputs(){
    fName.value = '';
    lName.value = '';
    email.value = '';
    pass.value = '';
}

function registerForNewEmail(){
    clearInputs();
    document.getElementById('login').innerHTML=`<button id=""  onclick="addUser()" class="btn btn-outline-success me-2 ">Register</button>`
    document.getElementById('alert').innerHTML = '';
}

function goToLogin(){

      document.getElementById('convertToLogin').innerHTML = `
     
      <label for="loginEmail"> Email </label>
      <input id="loginEmail" type="email" class="form-control mb-3" >

      <label for="loginPass"> Passowrd </label>
      <input id="loginPass" type="password" class="form-control mb-3" >

      <h1 id="alert" class="text-center text-danger">  </h1>

      <div>
         <button id=""  onclick="logingin()" class="btn btn-outline-success me-2 ">Login</button>
      </div>

   `;

}




function logingin(){
    var loginEmail = document.getElementById('loginEmail').value.trim().toLowerCase();
    var loginPass = document.getElementById('loginPass').value.trim();
    var currentUser = null;

    for(var i = 0 ; i < users.length ; i++){
        if( users[i].userEmail.toLowerCase() === loginEmail && users[i].password === loginPass )
            {
            currentUser = users[i];
            break;
           }
    }

    if(currentUser){
        // نخزن المستخدم الحالي
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        // نروح للدashboard
        window.location.href = "./Dashboard/Dashboard.html";
    } else {
        document.getElementById('alert').innerHTML =
          'Invalid email or password';
    }
}


