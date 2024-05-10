<script setup>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();

const login = () => {
  const auth = getAuth();

  // Se necesita .value por el uso de ref()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully singed in!");
      console.log(auth.currentUser);
      router.push("/feed");
    })
    .catch((err) => {
      /*
        firebase auth errors code:

        auth/invalid-email
        auth/user-not-found
        auth/wrong-password
        auth/user-disabled

        */
      console.log("Failed to register: ", err.code);
      switch (err.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid Email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        case "auth/user-disabled":
          errMsg.value = "User is Banned";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};

const singInWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // Primero, obtén el correo electrónico del usuario que intenta iniciar sesión con Google
  signInWithPopup(auth, provider)
    .then((result) => {
      const googleEmail = result.user.email;

      // Ahora, verifica si el correo electrónico ya está registrado utilizando el método tradicional
      fetchSignInMethodsForEmail(auth, googleEmail)
        .then((methods) => {
          // Si el método tradicional de inicio de sesión con correo electrónico es "password",
          // significa que el correo electrónico ya está registrado de manera tradicional.
          if (methods.includes("password")) {
            // Aquí puedes mostrar un mensaje de error o redirigir al usuario a una página de error.
            console.log("Este correo electrónico ya está registrado utilizando el método tradicional.");
          } else {
            // El correo electrónico no está registrado de manera tradicional, por lo que puedes permitir que el usuario inicie sesión con Google.
            console.log("Usuario autenticado con Google correctamente.");
            router.push("/feed");
          }
        })
        .catch((error) => {
          console.error("Error al verificar el correo electrónico:", error);
        });
    })
    .catch((error) => {
      console.error("Error al iniciar sesión con Google:", error);
    });
};

</script>
<template>
  <div class="text-center">
    <h1 class="text-2xl">Login</h1>
    <p><input type="email" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="login">Submit</button></p>
    <p><button @click="singInWithGoogle">Sing In With Google</button></p>
  </div>
</template>

<style scoped></style>
