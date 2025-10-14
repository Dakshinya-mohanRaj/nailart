// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// 🔥 Your Firebase Config (replace placeholders!)
const firebaseConfig = {
    apiKey: "AIzaSyCKuFqq1jYeUon9DgqMnaq6vg1tYDdTnPo",
    authDomain: "website-9a715.firebaseapp.com",
    projectId: "website-9a715",
    storageBucket: "website-9a715.firebasestorage.app",
    messagingSenderId: "1006565436423",
    appId: "1:1006565436423:web:a97c2176e5ead19a350ea2",
    measurementId: "G-TC1052C9MT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// === EMAIL/PASSWORD SIGN-UP ===
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert(`Welcome, ${name}! 🎉`);
      localStorage.setItem("userName", name);
      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// === EMAIL/PASSWORD LOGIN ===
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert(`Welcome back, ${user.email}! 🌸`);
      window.location.href = "index.html"; // redirect to shop/home
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("User not found. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else {
        alert(error.message);
      }
    }
  });
}

// === GOOGLE LOGIN ===
const googleLogin = document.getElementById("googleLogin");
const googleSignup = document.getElementById("googleSignup");
const provider = new GoogleAuthProvider();

if (googleLogin) {
  googleLogin.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome back, ${user.displayName}! 🌟`);
      localStorage.setItem("userName", user.displayName);
      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

if (googleSignup) {
  googleSignup.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}! 💅`);
      localStorage.setItem("userName", user.displayName);
      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
    }
  });
}
