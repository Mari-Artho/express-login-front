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

    fetch('http://localhost:5000/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(r => console.log(r.status >= 300 ? "Problem: " + r.status : "Signed up successfully"))
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

    fetch('http://localhost:5000/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json()) // parse result
    .then(data => {
        if (data.email != ""){ 
            // empty user data <=> login failed
            console.log('Log in 成功だよ！！'); // user info is in "data"
            console.log(data)
            setLoggedInScreen(data);
            localStorage.setItem('loggedIn', data._id);
        } else {
            loginFailMessage();
        }
    });
});

//Page to show in the browser when log in is successful
function setLoggedInScreen(data) {
  let username = data.email;
  let upperName = username.toUpperCase();
  loginResult.textContent = `✨ You are log in ${upperName} ✨  `;
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
  //css, subscribe button
  subscribeBtn.style.height = "60px";
  subscribeBtn.style.width = "400px";
  subscribeBtn.style.margin = "30px";
 
  //hide section(login) area.
  document.querySelector("section").style.display = "none";

  //click button => subscribe
  const setSubscribe = document.getElementById("subscribe");
  setSubscribe.addEventListener("click", settingSubscribe);
  //Subscribe button
  function settingSubscribe(){
     subscribeBtn.disabled = "disabled";
     subscribeBtn.innerText = (data.subscribe ? "You are now unsubscribed" : "Thank you for your subscription　📫") ;

  //create back to page button.
  const backBtn = document.createElement("button");
  backBtn.innerText = "Log out"
  backBtn.addEventListener("click", backBtnClick)
  loginResult.append(backBtn);
  //back button
  function backBtnClick() {
      localStorage.removeItem("loggedIn")
      location.href = "index.html"
  }

  //css, backBtn
  backBtn.style.height = "40px";
  backBtn.style.width = "100px";
  backBtn.style.margin = "30px";
  const backLink = document.getElementById("backLink");
  backLink.style.textDecoration = "none";
  backLink.style.color = "black";


    data.subscribe = !data.subscribe;

     fetch('http://localhost:5000/subscribe', {
         method: 'put',
     headers: {
         'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
     })
     .then(res => res.json())
     .then(data =>{
         console.log(data);

     })
}
}

function loginFailMessage(){
    alert("Log in failed. Please try again.");
    
}





