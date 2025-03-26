
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0oVRRgJE2t6BCyOq4VQT7HzEXLhb-1-U",
  authDomain: "learnleap-app.firebaseapp.com",
  projectId: "learnleap-app",
  storageBucket: "learnleap-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account' // Forces account selection even if one account is available
});

// Export auth instance and provider
export { auth, googleProvider };
export default app;
