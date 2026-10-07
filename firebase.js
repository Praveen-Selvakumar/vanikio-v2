// ============================================================
// VANIKIO - Firebase Configuration
// ============================================================

import {
    initializeApp
} from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut
} from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    getDocs,
    query,
    where,
    serverTimestamp
} from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


import {
    getStorage
} from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";


// ============================================================
// Firebase Config
// ============================================================

const firebaseConfig = {

    apiKey:
        "AIzaSyDQp3SzKyJRSW4iAKgtVRATLkdm55y4JHQ",

    authDomain:
        "tabletap-3c1b9.firebaseapp.com",

    projectId:
        "tabletap-3c1b9",

    storageBucket:
        "tabletap-3c1b9.firebasestorage.app",

    messagingSenderId:
        "17540244686",

    appId:
        "1:17540244686:web:993d4136b661d5bbe3dc9f",

    measurementId:
        "G-L88D3WK9LW"
};


// ============================================================
// Initialize Firebase
// ============================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);


// ============================================================
// Google Authentication
// ============================================================

const googleProvider =
    new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});


// ============================================================
// Authentication Persistence
// ============================================================

async function setAuthPersistence(rememberMe) {

    await setPersistence(
        auth,
        rememberMe
            ? browserLocalPersistence
            : browserSessionPersistence
    );

}


// ============================================================
// Create / Update User Profile
//
// Firestore:
// /users/{uid}
// ============================================================

async function createUserProfile(
    user,
    extraData = {}
) {

    if (!user) {
        throw new Error("User is required.");
    }

    const userRef = doc(
        db,
        "users",
        user.uid
    );

    const existingUser =
        await getDoc(userRef);

    const userData = {

        uid:
            user.uid,

        displayName:
            user.displayName ||
            extraData.displayName ||
            "",

        email:
            user.email || "",

        photoURL:
            user.photoURL || "",

        provider:
            extraData.provider ||
            "password",

        updatedAt:
            serverTimestamp()
    };


    if (!existingUser.exists()) {

        userData.createdAt =
            serverTimestamp();

    }


    await setDoc(
        userRef,
        userData,
        {
            merge: true
        }
    );

}


// ============================================================
// Exports
// ============================================================

export {

    // Firebase
    app,
    auth,
    db,
    storage,

    // Google
    googleProvider,

    // Login
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    sendPasswordResetEmail,

    // Persistence
    setAuthPersistence,
    browserLocalPersistence,
    browserSessionPersistence,

    // Auth State
    onAuthStateChanged,

    // Signup
    createUserWithEmailAndPassword,
    updateProfile,

    // User Profile
    createUserProfile,

    // Firestore
    doc,
    getDoc,
    setDoc,
    collection,
    getDocs,
    query,
    where,
    serverTimestamp,

    // Logout
    signOut
};