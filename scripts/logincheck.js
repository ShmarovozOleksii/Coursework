document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser === null) {
        window.location.href = "authorisation.html";
    }
});