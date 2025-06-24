// signup.js
// Include common Firebase initialization and functions
// import "./firebase_auth.js";
import { signUpUser } from "./firebase_auth.js";
// Attach event listener for sign-up button
const signUpBtn = document.querySelector('#signup');
signUpBtn.addEventListener('click', signUpUser);

import { checkUserAuthStatus } from "./firebase_auth.js";
checkUserAuthStatus()