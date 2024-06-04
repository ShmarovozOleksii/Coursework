function Logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}