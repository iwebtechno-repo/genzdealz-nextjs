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
    OAuthProvider,
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



// Google login function
async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Handle authenticated state
        await handleAuthStateChanged(user);
    } catch (error) {
        console.error("Google sign-in error:", error);
    }
}

// Apple login function (structured like Google login)
async function loginWithApple() {
    try {
        const provider = new OAuthProvider("apple.com");
        provider.addScope("email");
        provider.addScope("name");
        
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Handle authenticated state
        await handleAuthStateChanged(user);
    } catch (error) {
        console.error("Apple sign-in error:", error);
    }
}

// Handle authentication state and redirect if necessary
async function handleAuthStateChanged(user) {
    if (user) {
        const userId = user.uid;
        const name = user.displayName || "Anonymous";
        const email = user.email;
        const numericalUID = calculateNumericalUserUID(userId);

        await storeUserDetailsInFirestore(userId, name, email, numericalUID);
        const userData = await fetchUserDetailsFromFirestore(userId);

        if (userData) {
            localStorage.setItem("authenticated", "true");
            localStorage.setItem("userDataF", JSON.stringify(userData));

            // Check for redirection URL
            const redirectUrl = localStorage.getItem("redirectAfterLogin");
            if (redirectUrl) {
                window.location.href = redirectUrl;
                localStorage.removeItem("redirectAfterLogin"); // Clean up storage
            } else {
                // Redirect to homepage if no URL is stored
                window.location.href = "index";
            }
        } else {
            await signOutUser();
        }
    }
}

// Calculate numerical UID
function calculateNumericalUserUID(userId) {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        hash = (hash * 31) + userId.charCodeAt(i);
    }
    return Math.abs(hash) % 100000000000000;
}

// Store user details in Firestore
async function storeUserDetailsInFirestore(userId, name, email, numericalUID) {
    const userDocRef = doc(db, "usersCollection", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    const dataToSave = {
        name,
        email,
        numericalUserUID: numericalUID,
        iumsStudent: userDocSnapshot.exists() ? userDocSnapshot.data().iumsStudent : false,
        phoneVerified: userDocSnapshot.exists() ? userDocSnapshot.data().phoneVerified : false,
        isWebAppRegisteration: true,
    };

    await setDoc(userDocRef, dataToSave, { merge: true });
}

// Fetch user details from Firestore
async function fetchUserDetailsFromFirestore(userId) {
    const userDocRef = doc(db, "usersCollection", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    return userDocSnapshot.exists() ? userDocSnapshot.data() : null;
}

// Display user profile on the UI
function displayUserProfile(userData) {
    const userProfileContainer = document.getElementById("user-profile");
    userProfileContainer.innerHTML = `
        <p>${userData.email}</p>
        <p>${userData.name}</p>
        <a href="#" id="logoutButton">Logout</a>
    `;
    document.getElementById("logoutButton").addEventListener("click", signOutUser);
}

// Sign out function
async function signOutUser() {
    await signOut(auth);
    localStorage.clear();
    window.location.href = "login";
}

// Event listeners for Google and Apple login buttons
document.getElementById("googleLogin").addEventListener("click", loginWithGoogle);
document.getElementById("appleLogin").addEventListener("click", loginWithApple);


