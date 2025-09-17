import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail  } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from "./firebase"; // Make sure this points to your Firebase configuration
const auth = getAuth();

// Check if the user is logged in
function isUserLoggedIn() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

// Sign up with email and password
function signUpWithEmail(email, password) {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up successfully
                resolve(userCredential.user);
            })
            .catch((error) => {
                // Handle sign-up error
                reject(error.message);
            });
    });
}

// Login with email and password
function loginWithEmail(email, password) {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Logged in successfully
                resolve(userCredential.user);
            })
            .catch((error) => {
                // Handle login error
                reject(error.message);
            });
    });
}

// Sign in with Google
function signInWithGoogle() {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // Signed in with Google successfully
                resolve(result.user);
            })
            .catch((error) => {
                // Handle Google sign-in error
                reject(error.message);
            });
    });
}

async function forgotPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        // Handle error
        console.error("Error sending password reset email:", error);
        return false;
    }
}

async function doesAdminEmailExist(email) {
    const db = getFirestore(app);
    const q = query(collection(db, "Admins"), where("email", "==", email));

    try {
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error checking if admin email exists:", error);
        return false;
    }
}


export { isUserLoggedIn, signUpWithEmail, loginWithEmail, signInWithGoogle, forgotPassword, auth };
