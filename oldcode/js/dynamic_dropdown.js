function printUserDataDivs(userData) {
  if (userData) {
    const userDataObj = JSON.parse(userData);
    const profileContainer = document.getElementById('profile');
    profileContainer.classList.remove('d-none');
    profileContainer.classList.add('d-flex');
    
    const email = userDataObj['email'];
    const name = userDataObj['name'];
    
    if (email) {
      const emailDiv = document.createElement('div');
      emailDiv.classList.add('w-100', 'text-center');
      emailDiv.innerHTML = `<p class="fw-bold border-0 border-top border-bottom mb-0 py-3">${email}</p>`;
      profileContainer.appendChild(emailDiv);
    }
    
    if (name) {
      const nameDiv = document.createElement('div');
      nameDiv.innerHTML = `<p class="fw-bold mb-0 py-3">${name}</p>`;
      profileContainer.appendChild(nameDiv);
    }

    const logoutButton = document.createElement('div');
    logoutButton.innerHTML = '<p class="fw-bold mb-0 pb-4"><a href="#" class="text-white" onClick="logOut()" id="logoutButton"><i class="fa-solid fa-right-from-bracket pe-3"></i>Logout</a></p>';
    profileContainer.appendChild(logoutButton);
  }
}

// Check data stored under 'userDataA' key
const userDataA = localStorage.getItem('userDataA');

// Check data stored under 'userDataF' key
const userDataF = localStorage.getItem('userDataF');

// Print user data divs if 'userDataF' has data
printUserDataDivs(userDataF);

// Print user data divs if 'userDataA' has data
printUserDataDivs(userDataA);
// Import the auth object from firebase-auth.js
import { auth }  from "./firebase_auth.js";
// import { checkUserAuthStatus }  from "./firebase_auth.js";

// console.log("nhb")
// console.log(checkUserAuthStatus)
// debugger
// Your code that uses the auth object
function logOut() {
  

}
document.getElementById('logoutButton').addEventListener('click', function() {
  auth.signOut()
      .then(() => {
          localStorage.setItem('authenticated', 'false');
          window.location.href = 'login';
          // Clear all items in local storage
  localStorage.clear();
      })
      .catch((error) => {
          console.error('Error during sign-out:', error.message);
      });
});