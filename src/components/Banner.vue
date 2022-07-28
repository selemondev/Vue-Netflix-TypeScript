<script setup lang="ts">
import requests from "../Requests/requests";
import axios from "../Axios/axios";
import { ref } from "vue";
import type { MovieTypes } from "../Types/movieDataTypes";
import Navbar from "../components/Navbar.vue";
const randomMovie = ref<MovieTypes | null>(null);
const baseURL = "https://image.tmdb.org/t/p/original/";
const fetch = async () => {
    const response = await axios.get(requests.fetchTrending);
    randomMovie.value = response.data.results[Math.floor(Math.random() * response.data.results.length - 1)];
};
fetch();

const truncate = (value:string | any, n:number) => {
    return value?.length > n ? value.substring(0, n-1) + "..." : value;
}
</script>
<template>
    <div>
        <div>
            <Navbar/>
        </div>
        <div class="absolute top-0 left-0 -z-10 h-[95vh] w-full md:max-h-[95vh]">
            <img :src="`${baseURL}${randomMovie?.backdrop_path || randomMovie?.poster_path}`" :alt="randomMovie?.title" class="h-full w-full bg-cover">
        </div>

        <div class="flex flex-col space-y-2 pl-2 pt-32 pb-48 max-w-xs md:max-w-lg md:pl-8 md:pt-48 md:pb-40">
            <h2 class="text-white font-bold text-xl md:text-3xl">{{randomMovie?.title || randomMovie?.original_title || randomMovie?.original_name }}</h2>   
        <div class="pt-2 md:pt-4">
            <p class="text-white text-base">{{truncate(randomMovie?.overview, 300)}}</p>
        </div>
        <div class="pt-2 flex-center space-x-4 md:pt-4">
            <button class="py-1.5 px-4 rounded-sm bg-white hover:bg-gray-200 transition duration-200 ease-in items-center text-black space-x-2 md:space-x-3 md:px-6 md:py-2">
                <i class="fa-solid fa-play md:text-xl"></i>
                <span class="font-bold text-base md:text-xl">Play</span>
            </button>
             <button class="py-1.5 px-4 rounded-sm bg-gray-300/90 hover:bg-gray-300 transition duration-200 ease-in items-center text-black space-x-2 md:space-x-3 md:px-6 md:py-2">
                <i class="fa-solid fa-circle-info md:text-xl"></i>
                <span class="font-bold text-base md:text-xl">More Info</span>
            </button>
        </div>
        </div>
    </div>
</template>