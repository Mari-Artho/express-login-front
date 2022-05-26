//Sign up form 
let userList = document.getElementById('signupForm');
userList.innerHTML ="";

fetch("http://localhost:4000/api/post")
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
        password: password
    };

    fetch('http://localhost:4000/api/post', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        if (data === 'success'){
            console.log('It works!This is from script.js(front)');
            //Save to Localstorage
             let userId = data.userId;
        } else {
            console.log('It does not works!This is from script.js(front)');
        }
    });

});

//Log in button
document.getElementById('loginBtn').addEventListener('click', (e)=>{

    e.preventDefault();

    let loginEmail = document.getElementById('email').value;
    let loginPassword = document.getElementById('password').value;

    let user = {
        email: loginEmail,
        password: loginPassword
    };

    fetch('http://localhost:4000/api/post', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
       body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        if (data === 'success'){
            console.log('Log in　成功だよ！！');
            //Save to Localstorage
            //let userId = data.userId;
        } else {
            console.log('ログイン失敗だよ！！泣く！！');
        }
    });

});
