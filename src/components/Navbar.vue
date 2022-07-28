<script setup lang="ts">
import Netflix_Avatar from "../assets/Netflix-avatar.png";
import NetflixHeader from "../assets/Netflix-Header.png";
import { SearchIcon, BellIcon } from "@heroicons/vue/solid";
import { ref, watchEffect } from "vue";
const scrolled = ref(false);
const handleScroll = () => {
        if(window.scrollY > 0) {
            scrolled.value = true;
        } else {
            scrolled.value = false;
        };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
};
watchEffect(() => {
    handleScroll()
})
</script>
<template>
    <div>
        <header>
            <nav :class="[ scrolled ? 'bg-black z-10 fixed flex-layout w-full h-14 py-2' : 'bg-transparent fixed x-10 flex-layout w-full h-14 py-2' ]">
                <div class="flex-center space-x-8">
                    <div>
                        <img :src="NetflixHeader" alt="Netflix" class="w-24 h-14">
                    </div>
                    <div>
                        <ul class="hidden space-x-4 md:inline-flex">
                            <li class="li-tags text-white font-bold">Home</li>
                            <li class="li-tags">Tv Shows</li>
                            <li class="li-tags">Movies</li>
                            <li class="li-tags">New & Popular</li>
                            <li class="li-tags">My List</li>
                        </ul>
                    </div>
                </div>

                <div class="flex-center space-x-3">
                    <div>
                        <SearchIcon class="h-6 w-6 text-white"/>
                    </div>

                    <div>
                        <BellIcon class="h-6 w-6 text-white"/>
                    </div>
                    <div>
                        <img :src="Netflix_Avatar" alt="Netflix" class="w-8 h-8 rounded-md">
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>