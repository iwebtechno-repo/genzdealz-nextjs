// signin.js
// Include common Firebase initialization and functions
// import "./firebase_auth.js";
import { signInUser } from "./firebase_auth.js";
// Attach event listener for sign-in button
const signInBtn = document.querySelector('#signin');
signInBtn.addEventListener('click', signInUser);

import { resetPassword } from "./firebase_auth.js";
const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', resetPassword);

// import { checkUserAuthStatus } from "./firebase_auth.js";
// checkUserAuthStatus()

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => e.preventDefault());
  });

  document.querySelector('#password').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      signInUser();
    }
  });
  let enterPressed = false;
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !enterPressed) {
      enterPressed = true;
  
      const activeElement = document.activeElement;
  
      if (activeElement.closest('#loginForm')) {
        signInUser();
      } else if (activeElement.closest('#resetForm')) {
        resetPassword();
      }
  
      setTimeout(() => {
        enterPressed = false;
      }, 300); // 300ms delay
    }
  });
  
