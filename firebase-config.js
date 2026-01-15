// Firebase Configuration for TeamConnect
// Import Firebase SDKs from CDN (we'll use the CDN version in HTML files)

const firebaseConfig = {
  apiKey: "AIzaSyB2XW1pVGLfMU2W5k91jF9NKE0Tywx8rIY",
  authDomain: "teamconnect-17183.firebaseapp.com",
  projectId: "teamconnect-17183",
  storageBucket: "teamconnect-17183.firebasestorage.app",
  messagingSenderId: "304899676279",
  appId: "1:304899676279:web:a38bd010cef659f768ce72",
  measurementId: "G-J0RKR3LS16"
};

// Initialize Firebase
let app, auth, db, storage;

function initializeFirebase() {
  try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();
    console.log("✅ Firebase initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Firebase initialization error:", error);
    return false;
  }
}

// Helper function to check if user is logged in
function checkAuth() {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    });
  });
}

// Helper function to get current user
function getCurrentUser() {
  return firebase.auth().currentUser;
}

// Helper function to sign out
async function signOut() {
  try {
    await firebase.auth().signOut();
    console.log("✅ User signed out");
    return true;
  } catch (error) {
    console.error("❌ Sign out error:", error);
    return false;
  }
}
