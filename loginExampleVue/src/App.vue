<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from "vue-router"

const isLoggedIn = ref(false)
const router = useRouter()

const handleSignOut = () => {
    
    signOut(auth).then(() => {
        router.push("/sing-in")
    })
}

let auth
onMounted(() => {
    auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = user ? true : false
    })
})


</script>

<template>
    <nav class="hover:cursor-pointer">
        <router-link to="/" class="hover:underline">Home </router-link>
        <router-link to="/feed" class="hover:underline"> Feed </router-link>
        <router-link to="/register" class="hover:underline" v-if="isLoggedIn == false"> Register </router-link>
        <router-link to="/sing-in" class="hover:underline" v-if="isLoggedIn == false"> Login</router-link>
        <button @click="handleSignOut" v-if="isLoggedIn">Sing Out</button>
    </nav>
    <router-view />
</template>

<style scoped>
</style>
