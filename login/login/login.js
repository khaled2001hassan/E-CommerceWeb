import { auth } from '../../firebase/firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


var email = document.getElementById("email")
var emailError = document.getElementById("emailError")

var password = document.getElementById("password")
var passwordError = document.getElementById("passwordError")

var submitBtn = document.getElementById("submitBtn")
var CreateBtn = document.getElementById("CreateBtn")


submitBtn.addEventListener("click", () => {

    if (!isValid()) {
        return 0
    } else {
        console.log("Starting Firebase login...");
        signInWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
            alert("Login successful");
            console.log("User:", userCredential.user.uid);
            window.location.href = "/home/user/user_home.html";
        }).catch((error) => {
            alert(error.message);

        })
    }
})
CreateBtn.addEventListener("click", () => {
    window.location.href = "/login/register/register.html";
})
function isValid() {
    let check = true;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.textContent = "";
    passwordError.textContent = "";

    if (!emailReg.test(email.value)) {
        emailError.textContent = "Enter a valid email address";
        check = false;
    }

    if (password.value.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        check = false;
    }

    return check;

}
