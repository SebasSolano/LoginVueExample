<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  const auth = getAuth();

  // Se necesita .value por el uso de ref()
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");
      console.log(auth.currentUser);
      sendEmailVerification(auth.currentUser).then(() => {
        console.log("Email verification sent!");
      });
      router.push("/feed");
    })
    .catch((err) => {
      console.log("Failed to register: ", err.code);
      alert(err.message);
    });
};

const singInWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    const signInMethods = await fetchSignInMethodsForEmail(
      auth,
      result.user.email
    );
    if (signInMethods && signInMethods.length > 0) {
      errMsg.value = "This email is already registered with another method.";
      await auth.signOut(); // Sign out the user to prevent account linking issues
    } else {
      router.push("/feed");
    }
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    errMsg.value = "Failed to sign in with Google.";
  }
};
</script>

<template>
  <div class="text-center">
    <h1 class="text-2xl">Create an Account</h1>
    <p><input type="email" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="singInWithGoogle">Login With Google</button></p>
  </div>
</template>

<style scoped></style>
