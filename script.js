let userList = document.getElementById('loginForm');
userList.innerHTML ="";

fetch("http://localhost:4000/api/post")
.then(res => res.json())
.then(data => {
    console.log(data);

    data.forEach(user => {
        let userItem = document.createElement('li');
        userItem.innerHTML = `email/user name =>  ${user.email} <br> password =>  ${user.password}`;
        userList.appendChild(userItem);
    })
});

document.getElementById('loginBtn').addEventListener('click', (e)=>{

    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

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
            // let userId = data.userId;
        } else {
            console.log('It does not works!This is from script.js(front)');
        }
    });

});