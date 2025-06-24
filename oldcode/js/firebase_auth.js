// Common Firebase initialization and functions

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

$(".loader").hide();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzVJgzuoQrj0D52A1FzY7R31mpZaQ7xHU",
  authDomain: "student-marketplace-47b8e.firebaseapp.com",
  databaseURL: "https://student-marketplace-47b8e-default-rtdb.firebaseio.com",
  projectId: "student-marketplace-47b8e",
  storageBucket: "student-marketplace-47b8e.appspot.com",
  messagingSenderId: "221026630973",
  appId: "1:221026630973:web:0f781c0eb9b9de18c81954",
  measurementId: "G-M8HJ48LVH3",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


// Set app verification disabled for testing
// auth.settings.appVerificationDisabledForTesting = true;
// Export auth for use in other files
export { auth, createUserWithEmailAndPassword, doc, db, setDoc, getDoc, GoogleAuthProvider, signInWithPopup, onAuthStateChanged,signInWithPhoneNumber,RecaptchaVerifier };
// console.log(auth)
// const notify = $('.notify');
// notify.hide();
// document.querySelector('#number').addEventListener('input', restrictToNumbers);
// Function to retrieve phone number from user input

// Access the Firebase Authentication service
// const fetchAndLogUserData = async () => {
//   // Show loader while fetching data
//   $(".loader").show();

//   try {
//       // Get a reference to the "users" collection
//       const usersCollectionRef = collection(db, 'usersCollection');

//       // Fetch all documents in the "users" collection
//       const snapshot = await getDocs(usersCollectionRef);

//       // Log each user document
//       snapshot.forEach((doc) => {
//           console.log(doc.id, ' => ', doc.data());
//       });
//   } catch (error) {
//       console.error('Error fetching users: ', error);
//   } finally {
//       // Hide loader when fetching is done
//       $(".loader").hide();
//   }
// };

// Call the function to fetch and log user data
// fetchAndLogUserData();

function restrictToNumbers() {
  const input = document.querySelector("#number");
  if (!input) return false; // Exit if input is not found
  input.value = input.value.replace(/\D/g, ""); // Remove any non-numeric characters
  return true; // Validation passed
}

export async function signUpUser() {
  $(".loader").show();
  $(".text-signup").hide();
  
  let element = this;
  // Remove class
  // element.classList.remove("shadow");
  // // Add class after 0.2 seconds
  // setTimeout(function () {
  //   element.classList.add("shadow");
  // }, 200);
  // console.log('clicked')
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#loginid").value;
  const resetEmail = document.querySelector("#resetEmail").email;
  const password = document.querySelector("#password").value;
  const number = document.querySelector("#number").value;
  const gender = document.querySelector("#gender").value;
  const state = document.querySelector("#state").value;
  const birthDate = document.querySelector("#birthDate").value;
  const college = document.querySelector("#college").value;
  const course = document.querySelector("#course").value;
  // Validation checks

  // Assuming you have input fields with IDs 'name', 'loginid', 'password', 'number', 'gender', 'state'

  document.querySelector("#name").addEventListener("mouseout", validateFields);
  document
    .querySelector("#loginid")
    .addEventListener("mouseout", validateFields);
  document
    .querySelector("#password")
    .addEventListener("mouseout", validateFields);
  document
    .querySelector("#number")
    .addEventListener("mouseout", validateFields);
  // document
  //   .querySelector("#gender")
  //   .addEventListener("mouseout", validateFields);
  // document.querySelector("#state").addEventListener("mouseout", validateFields);
  document
    .querySelector("#number")
    .addEventListener("input", restrictToNumbers);
  // document
  //   .querySelector("#birthDate")
  //   .addEventListener("mouseout", validateFields);
  // document
  //   .querySelector("#college")
  //   .addEventListener("mouseout", validateFields);
  // document
  //   .querySelector("#course")
  //   .addEventListener("mouseout", validateFields);


  // Perform input validation
  const isNumberValid = restrictToNumbers();
  const isFieldsValid = validateFields();
  // Check if the phone number is already registered
  const isEmailValid = validateEmail(email);

  if (!isNumberValid || !isFieldsValid || !isEmailValid) {
    $(".toast").toast('show');
    // Display toast message
    $(".toast-body").text("Please fill all the fields");
    setTimeout(function () {
      $(".loader").hide();
      $(".text-signup").show();
    }, 200);
    debugger
    return; // Exit function if any validation fails
  }
  async function isPhoneNumberAlreadyRegistered(number) {
    try {
      const q = query(
        collection(db, "usersCollection"),
        where("phoneNumber", "==", number),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking phone number existence:", error);
      return false;
    }
  }
  const isPhoneNumberRegistered = await isPhoneNumberAlreadyRegistered(number);

  if (isPhoneNumberRegistered) {
    $(".toast").toast('show');
    // Display toast message
    $(".toast-body").text("Phone number already exists. Please use a different phone number.");
    setTimeout(function () {
      $(".loader").hide();
      $(".text-signup").show();
    }, 200);
    debugger
    return; // Exit function if any validation fails
  } else {
    proceedWithOtp()
  }

  async function proceedWithOtp() {
    try {
      class PasswordEncryptor {
        static _key = '9gcybtcn@';

        // Encrypt the password
        static encryptPassword(password) {
          const key = CryptoJS.enc.Utf8.parse(this._key.padEnd(32, '\0'));
          const encrypted = CryptoJS.AES.encrypt(password, key, { mode: CryptoJS.mode.ECB }).toString();
          return encrypted;
        }

        // Decrypt the password
        // static decryptPassword(encryptedPassword) {
        //   const key = CryptoJS.enc.Utf8.parse(this._key.padEnd(32, '\0'));
        //   const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key, { mode: CryptoJS.mode.ECB }).toString(CryptoJS.enc.Utf8);
        //   return decrypted;
        // }
      }
      // Example Usage
      let encryptedPassword = PasswordEncryptor.encryptPassword(password);
      // console.log('Encrypted Password:', encryptedPassword);
      // let decryptedPassword = PasswordEncryptor.decryptPassword(encryptedPassword);
      // console.log('Decrypted Password:',decryptedPassword );  
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userId = userCredential.user.uid;

      function calculateNumericalUserUID(userId) {
        let hash = 0;
        for (let i = 0; i < userId.length; i++) {
          hash = (hash * 31) + userId.charCodeAt(i);
        }
        return Math.abs(hash) % 100000000000000;
      }
      let numericalUID = calculateNumericalUserUID(userId);
      // Use the user's UID as the document ID when adding data to Firestore
      const userDocRef = doc(db, "usersCollection", userId);
      await setDoc(userDocRef, {
        name: name,
        email: email,
        password: encryptedPassword,
        phoneNumber: number,
        gender: gender,
        state: state,
        dateOfBirth: birthDate,
        college: college,
        course: course,
        iumsStudent: false,
        phoneVerified: false,
        numericalUserUID: numericalUID,
        isWebAppRegisteration : true,
      });
      // notify.show();
      // notify(`User with ID ${userId} signed up successfully`);
      // notify.innerHTML = `User with ID ${userId} signed up successfully`;
  gtag('event', 'signup_click_web', {
    'signup_click_web_category': 'Link Click',
    'signup_click_label': `User Details- ${name},${email},${number}`,
    'transport_type': 'beacon'
  });
      // event.preventDefault();
      checkUserAuthStatus();
      debugger;
      // window.location.href = "/splash_screen"; // Replace '/dashboard' with the desired URL
      // clearInputFields();
      // clearInputFields();
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        $(".toast").toast('show');
        // Display toast message
        $(".toast-body").text("Email already in use. Please enter a new email.");
        document.querySelector("#loginid").focus();
        $(".same-email").show();
        setTimeout(function () {
          $(".loader").hide();
          $(".text-signup").show();
        }, 200);
        // setTimeout(function () {
        //   $(".same-email").hide();
        // }, 3000);
        return
      } else {
        $(".toast").toast('hide');
        $(".same-email").hide();
      }
      setTimeout(function () {
        $(".loader").hide();
        $(".text-signup").show();
      }, 200);
      // notify.show();
      // notify(`Error: ${error.message}`);
      // notify.innerHTML = `Error: ${error.message}`;
    }
  }

}

function validateFields() {
  // Remove existing error messages
  document
    .querySelectorAll(".error-message")
    .forEach((element) => element.remove());

  // Gather all error messages
  let errorMessages = [];

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#loginid").value;
  const password = document.querySelector("#password").value;
  const number = document.querySelector("#number").value;
  // const gender = document.querySelector("#gender").value;
  // const state = document.querySelector("#state").value;
  // const birthDate = document.querySelector("#birthDate").value;
  // const college = document.querySelector("#college").value;
  // const course = document.querySelector("#course").value;
  const fields = {
    name: { value: name, id: "name" },
    email: { value: email, id: "loginid" },
    password: { value: password, id: "password" },
    number: { value: number, id: "number" },
    // gender: { value: gender, id: "gender" },
    // state: { value: state, id: "state" },
    // birthDate: { value: birthDate, id: "birthDate" },
    // college: { value: college, id: "college" },
    // course: { value: course, id: "course" },
  };

  if (!name) {
    errorMessages.push("Please enter your name.");
    showError(fields.name.id, "Please enter your name.");
  } else if (name.split(" ").length < 2) {
    errorMessages.push("Please enter your full name.");
    showError(fields.name.id, "Please enter your full name.");
  } else if (!number) {
    errorMessages.push("Please enter your phone number.");
    showError(fields.number.id, "Please enter your phone number.");
  } else if (!/^\d{10}$/.test(number)) {
    errorMessages.push("Please enter a valid 10-digit phone number.");
    showError(fields.number.id, "Please enter a valid 10-digit phone number.");
  }

  else if (!email) {
    errorMessages.push("Please enter your email address.");
    showError(fields.email.id, "Please enter your email address.");
  } else if (!validateEmail(email)) {
    errorMessages.push("Please enter a valid email address.");
    showError(fields.email.id, "Please enter a valid email address.");
  } else if (!password) {
    errorMessages.push("Please enter your password.");
    showError(fields.password.id, "Please enter your password.");
  } else if (password.length < 8) {
    errorMessages.push("Password should be at least 8 characters long.");
    showError(
      fields.password.id,
      "Password should be at least 8 characters long."
    );
  }
  // } else if (!gender) {
  //   errorMessages.push("Please select your gender.");
  //   showError(fields.gender.id, "Please select your gender.");
  // } else if (!["male", "female", "other"].includes(gender.toLowerCase())) {
  //   errorMessages.push("Please select a valid gender.");
  //   showError(fields.gender.id, "Please select a valid gender.");
  // } else if (birthDate === "") {
  //   errorMessages.push("Please select your date of birth.");
  //   showError(fields.birthDate.id, "Please select your date of birth.");
  // } else if (state === "") {
  //   errorMessages.push("Please select your state.");
  //   showError(fields.state.id, "Please select your state.");
  // } else if (!college) {
  //   errorMessages.push("Please select your college.");
  //   showError(fields.college.id, "Please select your college.");
  // } else if (!course) {
  //   errorMessages.push("Please select your course.");
  //   showError(fields.course.id, "Please select your course.");
  // }
  if (errorMessages.length > 0) {
    return false; // Validation failed
  }

  return true; // Validation passed
}

function showError(fieldId, errorMessage) {
  $(".toast").toast('show');
  // Display toast message
  $(".toast-body").text(errorMessage);
  const field = document.querySelector(`#${fieldId}`);
  field.focus();
  const errorElement = document.createElement("div");
  errorElement.classList.add("error-message", "text-start", "text-danger");
  errorElement.textContent = errorMessage;
  field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export async function signInUser() {
  // let element = this;
  // // Remove class
  // element.classList.remove("shadow");
  // // Add class after 0.2 seconds
  // setTimeout(function () {
  //   element.classList.add("shadow");
  // }, 200);
  $(".loader").show();
  $(".text-signup").hide();
  const emailInput = document.querySelector("#loginid");
  const passwordInput = document.querySelector("#password");

  const email = emailInput.value;
  const password = passwordInput.value;
  if (!email) {
    setTimeout(function () {
      $(".loader").hide();
      $(".text-signup").show();
    }, 200);
    emailInput.focus()
    // Show toast
    $(".toast").toast('show');
    // Display toast message
    $(".toast-body").text("Email not found");
    return;
  }
  if (!password) {
    setTimeout(function () {
      $(".loader").hide();
      $(".text-signup").show();
    }, 200);
    passwordInput.focus()
    // Show toast
    $(".toast").toast('show');
    // Display toast message
    $(".toast-body").text("Password not found");
    return;
  }
  debugger
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // const userId = userCredential.user.uid;
    // $(".toast").toast('show');
    // $(".toast-header strong").text(`Success`);
    // $(".toast-header i").removeClass("fa-skull text-danger");
    // $(".toast-header i").addClass("fa-face-smile-wink text-success");
    // $(".toast-body").text(`Logged in as ${email}.`);
    debugger
    // notify.show();
    // notify(`User with ID ${userId} signed in successfully`);
    // notify.innerHTML = `User with ID ${userId} signed in successfully`;
    // clearInputFields();
    checkUserAuthStatus();
    // Redirect the user to a specific location after successful sign-in
    // window.location.href = "/splash_screen"; // Replace '/dashboard' with the desired URL
  } catch (error) {

    setTimeout(function () {
      $(".loader").hide();
      $(".text-signup").show();
    }, 200);
    // Display toast message
    console.error(error);
    if (error.message == "Firebase: Error (auth/user-not-found).") {
      emailInput.focus();
      $(".toast").toast('show');
      $(".toast-body").text("User not registered with this email, please register first.");
    } else if (error.message == "Firebase: Error (auth/invalid-email).") {
      emailInput.focus();
      $(".toast").toast('show');
      $(".toast-body").text("Invalid Email");
    } else if (error.message == "Firebase: Error (auth/wrong-password).") {
      passwordInput.focus();
      $(".toast").toast('show');
      $(".toast-body").text("Wrong Password");
    } else if (error.message = "too-many-requests") {
      emailInput.focus();
      $(".toast").toast('show');
      $(".toast-body").text("Too Many Attempts. You can immediately restore it by resetting your password or you can try again later.");
    } else {
      $(".toast").toast('show');
      $(".toast-body").text(error.message);
      console.error(error.message);

    }

    // notify.innerHTML = `Error: ${error.message}`;
  }
}

function clearInputFields() {
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#number").value = "";
  document.querySelector("#gender").value = "";
  document.querySelector("#state").value = "";
  document.querySelector("#birthDate").value = "";
  setTimeout(() => {
    // notify.innerHTML = '';
  }, 3000);
}

  export async function checkUserAuthStatus() {
    const userStatus = document.querySelector(".user-status");

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        $(".loader").show();
        $(".text-signup").hide();
        // debugger;
        const userId = user.uid;
        const userEmail = user.email;
        const userDocRef = doc(db, "usersCollection", userId);
        try {
          const userDocSnapshot = await getDoc(userDocRef);
          // console.log(userDocSnapshot, userDocRef)
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            localStorage.setItem("userId", userId);
            localStorage.setItem("userDataF", JSON.stringify(userData));

            const userProfileContainer = document.getElementById("user-profile");
            // Example user data, replace this with your actual user data
            const exampleUserData = {
              name: userData.name,
              email: userData.email,
              // number: '1234567890',
              // gender: 'Male',
              // state: 'California'
            };

            // Create a div for 'email' property
            const emailDiv = document.createElement("div");
            emailDiv.classList.add("user-data", "w-100", "text-center");
            emailDiv.innerHTML = `<p class="fw-bold border-0 border-top border-bottom mb-0 py-3">${exampleUserData.email}</p>`;
            userProfileContainer.appendChild(emailDiv);

            // Create a div for 'name' property
            const nameDiv = document.createElement("div");
            nameDiv.classList.add("user-data", "w-100", "text-center");
            nameDiv.innerHTML = `<p class="fw-bold mb-0 py-3">${exampleUserData.name}</p>`;
            userProfileContainer.appendChild(nameDiv);

            // Add a logout button (assuming you want it)
            const logoutButton = document.createElement("div");
            logoutButton.classList.add("user-data", "w-100", "text-center");
            logoutButton.innerHTML =
              '<p class="fw-bold mb-0 pb-5"><a href="#" class="text-white" id="logoutButton"><i class="fa-solid fa-right-from-bracket pe-3"></i>Logout</a></p>';
            userProfileContainer.appendChild(logoutButton);

            document
              .getElementById("logoutButton")
              .addEventListener("click", function () {
                // Your logout code here
                auth
                  .signOut()
                  .then(() => {
                    localStorage.setItem("authenticated", "false");
                    window.location.href = "login";
                    // Clear all items in local storage
                    localStorage.clear();
                  })
                  .catch((error) => {
                    console.error("Error during sign-out:", error.message);
                  });
              });
          } else {
            // console.log("User document does not exist");
            auth
              .signOut()
              .then(() => {
                localStorage.setItem("authenticated", "false");
                window.location.href = "login";
                // Clear all items in local storage
                localStorage.clear();
              })
              .catch((error) => {
                console.error("Error during sign-out:", error.message);
              });
          }
        } catch (error) {
          setTimeout(function () {
            $(".loader").hide();
            $(".text-signup").show();
          }, 200);
          console.error("Error fetching user document:", error);
        }
        localStorage.setItem("authenticated", "true");

        // localStorage.setItem('last_name', '');
        // localStorage.setItem('gender', '');
        // localStorage.setItem('mobile_no', '');
        // localStorage.setItem('email_id', '');
        // localStorage.setItem('state_name', '');
        // localStorage.setItem('full_name', '');
        // localStorage.setItem('first_name', '');
        // localStorage.setItem('userId', '');
        // localStorage.setItem('userName', '');
        // You can display user information or perform additional actions when the user is logged in.
        // Check your condition for redirection
        if (shouldRedirect()) {
          // Check if there's a URL stored for redirection
    const redirectUrl = localStorage.getItem('redirectAfterLogin');
    
    if (redirectUrl) {
      // Redirect to the intended URL
      window.location.href = redirectUrl;
      localStorage.removeItem('redirectAfterLogin'); // Clean up storage
    } else {
      // If no URL is stored, redirect to the homepage
      window.location.href = '/index';
    }
        }
        // $("body").hide()
        userStatus.innerHTML = `User ID: ${userId} (Signed In)`;
      } else {
        setTimeout(function () {
          $(".loader").hide();
          $(".text-signup").show();
        }, 200);
        // User is signed out.
        // console.log("User is signed out");

        // You can redirect to a login page or perform other actions when the user is logged out.
        userStatus.innerHTML = "User not signed in";
      }
    });
  }
  // checkUserAuthStatus()
// Example condition function for redirection
// Example: Call the function when your application starts

function shouldRedirect() {
  // Add your condition here, e.g., check if a specific property is set in session storage
  return localStorage.getItem("authenticated") === "true";
}

export async function resetPassword() {
  let element = this;
  // Remove class
  // element.classList.remove("shadow");
  // // Add class after 0.2 seconds
  // setTimeout(function () {
  //   element.classList.add("shadow");
  // }, 200);
  $(".loader").show();
  $(".text-signup").hide();
  const emailInput = document.querySelector("#resetEmail");



  const email = emailInput.value;
  if (!email) {
    setTimeout(function () {
      $(".loader").hide();
      $(".text-signup").show();
    }, 200);
    $(".toast").toast('show');
    $(".toast-body").text("Reset Email not found");
    console.error("Reset Email not found");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    setTimeout(function () {
      $(".loader").hide();
      $(".text-signup").show();
    }, 200);
    $(".toast").toast('show');
    // $(".toast-header strong").text(`Success`);
    // $(".toast-header i").removeClass("fa-skull text-danger");
    // $(".toast-header i").addClass("fa-face-smile-wink text-success");
    $(".toast-body").text(`Password reset email sent to ${email}. Check your inbox.`);
    // notify.show();
    // notify(`Password reset email sent to ${email}. Check your inbox.`);
    //   notify.innerHTML = `Password reset email sent to ${email}. Check your inbox.`;
  } catch (error) {
    setTimeout(function () {
      $(".loader").hide();
      $(".text-signup").show();
    }, 200);

    if (error.message == "Firebase: Error (auth/user-not-found).") {
      $(".toast").toast('show');
      $(".toast-body").text("User not registered with this email, please register first.");
    } else if (error.message == "Firebase: Error (auth/invalid-email).") {
      $(".toast").toast('show');
      $(".toast-body").text("Invalid Email");
    } else {
      $(".toast").toast('show');
      $(".toast-body").text(error.message);
      console.error(error.message);
    }
  }
}
