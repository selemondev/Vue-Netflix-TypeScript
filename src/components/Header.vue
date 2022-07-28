<script setup lang="ts">
import NetflixBg from "../assets/Netflix-BG.jpg";
import NetflixHeader from "../assets/Netflix-Header.png";
</script>
<template>
<div>
    <div>
        <img :src="NetflixBg" alt="Netflix" class="w-full h-full bg-cover opacity-60 bg-center bg-no-repeat absolute -z-20">
    </div>
    <header>
            <nav class="flex justify-between items-center w-full h-14 p-2 md:p-8">
               <div>
                 <img :src="NetflixHeader" alt="Netflix" class="w-32 h-16 md:w-40 md:h-20">
               </div>

               <div>
                <button class="bg-red-500 hover:bg-red-600 transition duration-200 ease-in text-white rounded-md text-sm py-1.5 px-6 items-center md:text-base">Sign In</button>
               </div>
            </nav>
    </header>
</div>
</template>