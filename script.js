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
        userItem.innerHTML = ` ${user.email}, ${user.password}, subscribed: ${user.subscribe}<br>`;
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
            setLoggedInScreen(data);
            
        } else {
            loginFailMessage();
        }
    });
});

//Page to show in the browser when log in is successful
function setLoggedInScreen(data) {
    let username = data.email;
  let upperName = username.toUpperCase();
  loginResult.textContent = `You are log in ${upperName} ✨ Do you want to subscribe or not? `;
  //create subscribe button.
  const subscribeBtn = document.createElement("button");
  subscribeBtn.innerText = (data.subscribe ? "UN" : "") + "SUBSCRIBE";
  loginResult.append(subscribeBtn);
  //add id to subscribe btn.
  subscribeBtn.setAttribute("id", "subscribe");

  //css, message
  loginResult.style.display = "flex";
  loginResult.style.flexDirection = "column";
  loginResult.style.fontFamily = "Rubik";
  loginResult.style.color = "red";

  //css, subscribe button
  subscribeBtn.style.height = "60px";
  subscribeBtn.style.width = "400px";
  subscribeBtn.style.margin = "30px";
 
  //hide section(login) area.
  document.querySelector("section").style.display = "none";

  //click button => subscribe
  const setSubscribe = document.getElementById("subscribe");
  setSubscribe.addEventListener("click", settingSubscribe);
}

function loginFailMessage(){
    alert("Log in failed. Please try again.");
    
}

//Subscribe button
function settingSubscribe(){
    // document.getElementById('subscribe').addEventListener('click',(e)=> {
       // e.preventDefault();
        console.log("Thank you 購読ありがとう!");
         //ここでデータをfetchして、購読がtrueかfalseによって、ボタン表示を変えないといけない。ぎゃー。
// TODO: Update subscribe status
 //   } 
 //   )
}