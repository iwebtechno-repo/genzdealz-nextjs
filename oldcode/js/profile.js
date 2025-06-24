import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    EmailAuthProvider, reauthenticateWithCredential, deleteUser
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    where,
    limit,
    getDocs,
    deleteDoc
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

// Form field IDs
const formFields = [
    'name', 'number', 'loginid', 'gender', 'birthDate', 'state', 'college', 'course'
];

// Disable all fields initially
formFields.forEach(fieldId => document.getElementById(fieldId).disabled = true);

// Function to populate fields with user data from Firestore
async function loadUserData() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userDocRef = doc(db, "usersCollection", user.uid);
            const userSnapshot = await getDoc(userDocRef);

            if (userSnapshot.exists()) {
                const data = userSnapshot.data();
                document.getElementById('name').value = data.name || '';
                document.getElementById('number').value = data.phoneNumber || '';
                document.getElementById('loginid').value = data.email || '';
                document.getElementById('gender').value = data.gender || '';
                document.getElementById('birthDate').value = data.dateOfBirth || '';
                document.getElementById('state').value = data.state || '';
                document.getElementById('college').value = data.college || '';
                document.getElementById('course').value = data.course || '';
            } else {
                // console.log("No user data found");
            }
        } else {
            // console.log("User is not signed in");
            window.location.href = 'login';
        }
    });
}

// Enable fields and toggle buttons when Edit button is clicked
document.getElementById('editDetail').addEventListener('click', () => {
    formFields.forEach(fieldId => document.getElementById(fieldId).disabled = false);
    document.getElementById('editDetail').style.display = 'none';
    document.getElementById('saveDetail').style.display = 'block';
});

// Function to show error message
function showError(message) {
    showToast(message); // Replace with your toast or validation method if needed
}

// Check if email or phone number already exists
async function isEmailOrPhoneDuplicate(email, phoneNumber, currentUserId) {
    const usersCollectionRef = collection(db, "usersCollection");

    const emailQuery = query(usersCollectionRef, where("email", "==", email));
    const phoneQuery = query(usersCollectionRef, where("phoneNumber", "==", phoneNumber));

    const emailSnapshot = await getDocs(emailQuery);
    const phoneSnapshot = await getDocs(phoneQuery);

    const emailExists = emailSnapshot.docs.some(doc => doc.id !== currentUserId);
    const phoneExists = phoneSnapshot.docs.some(doc => doc.id !== currentUserId);

    return { emailExists, phoneExists };
}

// Save user data and disable fields when Save button is clicked
// Save user data and disable fields when Save button is clicked
async function saveUserData() {
    const name = document.getElementById('name').value.trim();
    const phoneNumber = document.getElementById('number').value.trim();
    const email = document.getElementById('loginid').value.trim();
    const user = auth.currentUser;

    if (!name || !phoneNumber || !email) {
        showToast("Name, Phone Number, and Email are required fields.");
        return;
    }

    // Validate phone number format (10 digits, only numbers)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
        showToast("Phone number must be exactly 10 digits and contain only numbers.");
        return;
    }

    try {
        // Fetch the current user data from Firestore
        const userDocRef = doc(db, "usersCollection", user.uid);
        const userSnapshot = await getDoc(userDocRef);
        const currentData = userSnapshot.data();

        // Check if number or email already exists in Firestore (other than the current user)
        const phoneQuery = query(collection(db, "usersCollection"), where("phoneNumber", "==", phoneNumber), limit(1));
        const emailQuery = query(collection(db, "usersCollection"), where("email", "==", email), limit(1));
        
        const [phoneSnap, emailSnap] = await Promise.all([getDocs(phoneQuery), getDocs(emailQuery)]);

        const phoneExists = !phoneSnap.empty && phoneSnap.docs[0].id !== user.uid;
        const emailExists = !emailSnap.empty && emailSnap.docs[0].id !== user.uid;

        if (phoneExists || emailExists) {
            if (phoneExists) {
                showToast("Phone number is already in use.");
            }
            if (emailExists) {
                showToast("Email is already in use.");
            }
            return;
        }

        // Check if the phone number is updated
        let phoneVerified = currentData?.phoneNumber === phoneNumber ? currentData.phoneVerified : false;

        // Update Firestore and local storage if validations pass
        const updatedData = {
            name,
            phoneNumber,
            email,
            phoneVerified,
            gender: document.getElementById('gender').value,
            dateOfBirth: document.getElementById('birthDate').value,
            state: document.getElementById('state').value,
            college: document.getElementById('college').value,
            course: document.getElementById('course').value
        };

        await setDoc(userDocRef, updatedData, { merge: true });
        showToast("Profile updated successfully!");

        // Update local storage
        localStorage.setItem("userDataF", JSON.stringify(updatedData));

        // Disable fields and toggle buttons
        formFields.forEach(fieldId => document.getElementById(fieldId).disabled = true);
        document.getElementById('editDetail').style.display = 'block';
        document.getElementById('saveDetail').style.display = 'none';
    } catch (error) {
        console.error("Error updating profile: ", error);
        showToast("Failed to update profile. Please try again.");
    }
}
// Toast function for displaying errors
function showToast(message) {
    const toastContainer = document.querySelector('.toast-container');
    const toastBody = document.querySelector('.toast-body');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(document.querySelector('.toast'));
    toast.show();
}
// Add event listener to Save button
document.getElementById('saveDetail').addEventListener('click', async (event) => {
    event.preventDefault();
    await saveUserData();
});

// Load user data on page load
loadUserData();

// Function to delete the user account with reauthentication
async function deleteAccount() {
    const user = auth.currentUser;

    if (user) {
        try {
            // Try to delete the account directly
            await deleteFirestoreUserData(user.uid);
            await deleteUser(user);
            localStorage.clear();
            auth.signOut()
      .then(() => {
          localStorage.setItem('authenticated', 'false');
          window.location.href = 'login';
          // Clear all items in local storage
      })
      .catch((error) => {
          console.error('Error during sign-out:', error.message);
      });
            showToast("Your account has been deleted successfully.");
            window.location.href = "/login";
        } catch (error) {
            if (error.code === "auth/requires-recent-login") {
                // If the error requires recent login, reauthenticate the user
                reauthenticateUser(user);
            } else {
                console.error("Error deleting account: ", error);
                showToast("Failed to delete account. Please try again.");
            }
        }
    } else {
        // console.log("User is not authenticated.");
    }
}

// Reauthenticate user and try deletion again
async function reauthenticateUser(user) {
    // Show modal for reauthentication input
    const reauthModal = new bootstrap.Modal(document.getElementById('reauthenticateModal'));
    reauthModal.show();

    // Wait for user to input credentials and confirm
    document.getElementById('reauthenticateConfirm').addEventListener('click', async () => {
        const email = document.getElementById('reauthEmail').value.trim();
        const password = document.getElementById('reauthPassword').value.trim();

        if (!email || !password) {
            showToast("Email and password are required for reauthentication.");
            return;
        }

        const credential = EmailAuthProvider.credential(email, password);

        try {
            // Reauthenticate the user
            await reauthenticateWithCredential(user, credential);
            showToast("Reauthentication successful. Proceeding with account deletion.");

            // Close modal and delete account after reauthentication
            reauthModal.hide();
            await deleteAccount();
        } catch (error) {
            console.error("Reauthentication failed: ", error);
            showToast("Failed to reauthenticate. Please try again.");
        }
    });
}


// Delete the user's data from Firestore
async function deleteFirestoreUserData(userId) {
    const userDocRef = doc(db, "usersCollection", userId);
    try {
        await deleteDoc(userDocRef);
        // console.log("User data deleted from Firestore.");
    } catch (error) {
        console.error("Error deleting user data from Firestore: ", error);
    }
}

// Show the delete account confirmation modal when Delete button is clicked
document.getElementById('deleteAccount').addEventListener('click', () => {
    const deleteAccountModal = new bootstrap.Modal(document.getElementById('deleteAccountModal'));
    deleteAccountModal.show();
});

// Handle the confirmation button click in the modal
document.getElementById('confirmDeleteAccount').addEventListener('click', async () => {
    await deleteAccount();
    const deleteAccountModal = bootstrap.Modal.getInstance(document.getElementById('deleteAccountModal'));
    deleteAccountModal.hide();
});
