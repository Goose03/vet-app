import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDXy5MMj8VpbjAgh2kLk-xXZNznElcHV-4",
  authDomain: "vet-app-b5330.firebaseapp.com",
  projectId: "vet-app-b5330",
  storageBucket: "vet-app-b5330.firebasestorage.app",
  messagingSenderId: "211552480026",
  appId: "1:211552480026:web:eccaf998a5f7690ae15aa3",
  measurementId: "G-ER47CWVW0W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
