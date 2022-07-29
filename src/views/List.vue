<script setup lang="ts">
import {  ref, watchEffect } from "vue";
import { useMovieStore } from "@/stores/movieStore";
import type { MovieTypes } from "@/Types/movieDataTypes";
import Navbar from '../components/Navbar.vue';
const movieStore = useMovieStore();
const listMovies = ref<MovieTypes[]>([]);
const baseURL = "https://image.tmdb.org/t/p/original/";
watchEffect(() => {
    listMovies.value = movieStore.movies;
});
const truncate = (value:string | any, n:number) => {
    return value?.length > n ? value.substring(0, n-1) + "..." : value;
}
</script>
<template>
<div>
    <Navbar/>
     <div class="flex items-center flex-wrap pt-20">
        <div v-for="movie in listMovies" :key="movie.id" class="m-1 md:m-2">
          <router-link :to="{name:'movie', params:{id: movie.id}}">
            <img :src="`${baseURL}${movie?.backdrop_path || movie?.poster_path}`" :alt="movie?.title" class="h-40 w-48 p-2 md:h-48 md:w-[250px]">
        </router-link>

        <div class="text-center">
            <p class="text-white font-bold">{{truncate(movie?.title || movie?.original_title || movie?.original_name , 30)}}</p>
        </div>
        </div>
    </div>
</div>
</template>