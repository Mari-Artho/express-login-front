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
            // TODO: use user info, (later) indicate if subscribed or not　
            setLoggedInScreen(data.email);
            
        } else {
            console.log('ログイン失敗だよ！！泣く！！');
            // TODO: show failure in frontend, not just console
        }
    });

});

//ログインに成功したらブラウザーで見せるページを作ってる
  let username = data.email;
  function setLoggedInScreen(username) {
    // // remember session
    // localStorage.setItem("loggedInUser", username);
    let upperName = username.toUpperCase();
    loginResult.textContent = `You are log in ${upperName} ✨ Do you want to subscribe or not? `;
    //create logout button.
    const subscribeBtn = document.createElement("button");
    subscribeBtn.innerText = " Subscribe";
    loginResult.append(subscribeBtn);
    //add id name to logout btn.
    subscribeBtn.setAttribute("id", "subscribe");
  
    //css, display colmun
    document.getElementById("loginResult").style.display = "flex";
    document.getElementById("loginResult").style.flexDirection = "column";
    //hide section(login) area.
    document.querySelector("section").style.display = "none";
    //decoration css
    // document.querySelector("header").style.height = "450px";
    // logoutBtn.style.marginTop = "70px";
    // //click button, subscribe
    // const btnLogout = document.getElementById("subscribeBtn");
    // btnLogout.addEventListener("click", logout);
  }
