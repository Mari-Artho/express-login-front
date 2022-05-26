//show html after login success
const loginResult = document.getElementById("loginResult");

//Show all sign up users at list
let userList = document.getElementById('signupForm');
userList.innerHTML ="";

fetch("http://localhost:4000/users")
.then(res => res.json())
.then(data => {
    console.log(data);

    data.forEach(user => {
        let userItem = document.createElement('li');
        userItem.innerHTML = ` ${user.email} <br>  ${user.password}`;
        userList.appendChild(userItem);
    })
});

//Sign up button
document.getElementById('signupBtn').addEventListener('click', (e)=>{

    e.preventDefault();

    let email = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;

    let user = {
        email: email,
        password: password,
        subscribe: false
    };

    fetch('http://localhost:4000/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
});

//Log in button
document.getElementById('loginBtn').addEventListener('click', (e)=>{

    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let user = {
        email: email,
        password: password
    };

    fetch('http://localhost:4000/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
       body: JSON.stringify(user)
    })
    .then(res => res.json()) // parse result
    .then(data => {
        if (data.email != ""){ // empty user data <=> login failed
            console.log('Log in 成功だよ！！'); // user info is in "data"
            setLoggedInScreen(data.email);
            
        } else {
            loginFailMessage();
        }
    });
});

//Page to show in the browser when log in is successful
function setLoggedInScreen(username) {
  let upperName = username.toUpperCase();
  loginResult.textContent = `You are log in ${upperName} ✨ Do you want to subscribe or not? `;
  //create subscribe button.
  const subscribeBtn = document.createElement("button");
  subscribeBtn.innerText = " SUBSCRIBE";
  loginResult.append(subscribeBtn);
  //add id to subscribe btn.
  subscribeBtn.setAttribute("id", "subscribe");

  //css, display colmun
  document.getElementById("loginResult").style.display = "flex";
  document.getElementById("loginResult").style.flexDirection = "column";
  //hide section(login) area.
  document.querySelector("section").style.display = "none";
  //decoration css
  // document.querySelector("header").style.height = "450px";
  // logoutBtn.style.marginTop = "70px";
  //click button, subscribe
  const setSubscribe = document.getElementById("subscribe");
  setSubscribe.addEventListener("click", settingSubscribe);
}
function loginFailMessage(){
    alert("Log in failed. Please try again.");
    
}

//Subscribe button
function settingSubscribe(){
    document.getElementById('subscribe').addEventListener('click',(e)=> {
        e.preventDefault();
        console.log("Thank you sb!")
        alert("Thank you for subscribe");
    } )
}



