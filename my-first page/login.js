const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginMessage.textContent = "Demo only: no account was checked and you are not signed in.";
});