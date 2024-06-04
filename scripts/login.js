const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const username = form.username.value
    const password = form.password.value

    const authenticated = authentication(username, password)

    if (authenticated) {
        localStorage.setItem('loggedInUser', username); 
        window.location.href = "create_offer.html"
    } else {
        alert("Username or Password is incorrect")
    }
})

var users = [
    { username: 'admin', password: 'password' },
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

function authentication(username, password) {
    for (var i = 0; i < users.length; i++) {
        if (username === users[i].username && password === users[i].password) {
            return true
        }
    }
    return false
}