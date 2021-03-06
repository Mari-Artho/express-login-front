const loggedIn = localStorage.getItem('loggedIn')

const HOST = 'https://expressloginnews.herokuapp.com/'

if (loggedIn != null) {
    let user = {
        id: loggedIn
    };
    console.log("Trying to restore session...")

    fetch(HOST + 'restore', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json()) // parse result
    .then(data => {
        if (data.email != ""){
            document.body.innerHTML = '<div id="loginResult"></div><section></section>'
            setLoggedInScreen(data);
        } else {
            loggedIn = null
        }
    })
}

if (loggedIn == null) {
    loginScreen();
}

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

    data.subscribe = !data.subscribe;

    fetch(HOST + 'subscribe', {
        method: 'put',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
  }

  //create back to page button.
  const backBtn = document.createElement("button");
  backBtn.innerText = "Log out"
  backBtn.id = "backLink"
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
}

function loginFailMessage(){
    alert("Log in failed. Please try again.");
    
}

//show login screen
function loginScreen(){
    document.body.innerHTML = 
    `<div id="adminMessage"></div>

    <div id="loginResult">
        <h2>Log in</h2>
        <form>
            <input type="text" id="email" placeholder="email/username">
            <input type="password" id="password" placeholder="password">
            <input type="submit" id="loginBtn" value="Log In">
        </form>
    </div>

    <section>
    <h2>Are you new? Sign up!</h2>
    <div>
        <form>
            <input type="text" id="signupEmail" placeholder="email/username">
            <input type="password" id="signupPassword" placeholder="password">
            <input type="submit" id="signupBtn" value="Sign Up">
        </form>
    </div>
    </section>
    <ol id="signupForm"></ol>
    <div id="subscribedTitle"></div>
    <ol id="subscriber"></ol>
    <div id="adminBtn"></div>`
    //Log in button
    document.getElementById('loginBtn').addEventListener('click', (e)=>{

        e.preventDefault();

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let user = {
            email: email,
            password: password
        };

        fetch(HOST + 'login', {
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
                setLoggedInScreen(data);
                localStorage.setItem('loggedIn', data._id);
            } else {
                loginFailMessage();
            }
        });
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

        fetch(HOST + 'signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => setLoggedInScreen(data))
    });
}


