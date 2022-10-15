import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCh7C_B96c0fzx5XchPJt9MVSgTzcxMHb8",
  authDomain: "watch-shop-baacc.firebaseapp.com",
  projectId: "watch-shop-baacc",
  storageBucket: "watch-shop-baacc.appspot.com",
  messagingSenderId: "662943368138",
  appId: "1:662943368138:web:1686fa1674bbe9c5cf8533",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
