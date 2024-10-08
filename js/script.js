const btnSignIn = document.getElementById("sign-in");
const btnSignUp = document.getElementById("sign-up");
const containerFormRegister = document.querySelector(".register");
const containerFormLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", e => {
    containerFormRegister.classList.add("hide");
    containerFormLogin.classList.remove("hide");
});

btnSignUp.addEventListener("click", e => {
    containerFormLogin.classList.add("hide");
    containerFormRegister.classList.remove("hide");
});