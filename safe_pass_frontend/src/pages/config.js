import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK2wuIWSdVju2qfcrmUL2Mp8cSBS3nXuI",
  authDomain: "portfolioimages-4a133.firebaseapp.com",
  projectId: "portfolioimages-4a133",
  storageBucket: "portfolioimages-4a133.appspot.com",
  messagingSenderId: "26194872766",
  appId: "1:26194872766:web:975d35a25bd035365951ef",
};

//initalize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
