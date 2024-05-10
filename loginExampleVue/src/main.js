import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOSAyUufc4ViweVqDwJZht7D4vnqsDUoo",
  authDomain: "vue-firebase-auth-9b7b2.firebaseapp.com",
  projectId: "vue-firebase-auth-9b7b2",
  storageBucket: "vue-firebase-auth-9b7b2.appspot.com",
  messagingSenderId: "928927709761",
  appId: "1:928927709761:web:66ef5b45789102b93724c0"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')
