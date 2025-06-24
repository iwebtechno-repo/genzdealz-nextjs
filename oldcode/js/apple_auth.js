import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  OAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Firebase Configuration - Add your Firebase project configuration here
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get Firebase Authentication instance
const auth = getAuth();
// console.log(auth);

// Create an instance of OAuthProvider for Apple
const provider = new OAuthProvider("apple.com");
provider.addScope("email");
provider.addScope("name");

// Function to save user data to Firestore
const saveUserDataToFirestore = async (user, accessToken, idToken) => {
  try {
    const userDocRef = doc(collection(db, "usersCollection"), user.uid);

    // If displayName is null, provide a default value
    const displayName = user.displayName || "Anonymous"; 

    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      accessToken: accessToken,
      idToken: idToken,
      providerId: user.providerData[0]?.providerId,
      photoURL: user.photoURL || null,
      lastLogin: user.metadata.lastSignInTime,
      createdAt: user.metadata.creationTime,
      isWebAppRegisteration: true,
    });
    // console.log("User data saved to Firestore successfully.");
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
};


// Button handlers for popup and redirect sign-in
document.getElementById("apple-signin-popup").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;

      // console.log("User info:", user);
      // console.log("Access Token:", accessToken);
      // console.log("ID Token:", idToken);

      // Save user data to Firestore
      saveUserDataToFirestore(user, accessToken, idToken);
    })
    .catch((error) => {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Credential:", OAuthProvider.credentialFromError(error));
    });
});

document.getElementById("apple-signin-redirect").addEventListener("click", () => {
  signInWithRedirect(auth, provider);
});

// Handle the redirect result after user returns to your page
getRedirectResult(auth)
  .then((result) => {
    if (result) {
      const user = result.user;
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;

      // console.log("User info:", user);
      // console.log("Access Token:", accessToken);
      // console.log("ID Token:", idToken);

      // Save user data to Firestore
      saveUserDataToFirestore(user, accessToken, idToken);
    }
  })
  .catch((error) => {
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Credential:", OAuthProvider.credentialFromError(error));
  });
