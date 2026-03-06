

// login to home page    
document.getElementById("login-btn").addEventListener("click", ()=>{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username,password);

    if( username === 'admin' && password === 'admin123' ) {
        window.location.assign('./home.html');
    }
    else {
        alert(`
            Wrong Username or Password!
            Your Written,
            Username: ${username}
            Password: ${password}
            `)
    }
})