<script setup lang="ts">
import axios from "@/Axios/axios";
import { ref } from "vue";
import type { MovieTypes } from "@/Types/movieDataTypes";
const baseURL = "https://image.tmdb.org/t/p/original/";
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    fetchUrl: {
        type: String,
         required: true,
    }
});
const movies = ref<MovieTypes[]>([]);
const fetchMovies = async () => {
    const response = await axios.get(props.fetchUrl);
    response.data.results.map((movie:MovieTypes) => {
        movies.value.push(movie)
    })
};
fetchMovies();
</script>
<template>
    <div class="px-2 md:p-3">
        <div class="pl-1 md:pl-4">
            <h1 class="text-white font-bold">{{props.title}}</h1>
        </div>

        <div class="flex items-center scrollbar-hide overflow-x-auto">
        <div v-for="movie in movies" :key="movie.id" class="m-1 md:m-2">
          <router-link :to="{name:'movie', params:{id: movie.id}}">
            <img :src="`${baseURL}${movie?.backdrop_path || movie?.poster_path}`" :alt="movie?.title" class="hover:scale-125 transition duration-500 ease-in h-40 min-w-[150px] p-2 md:h-48 md:min-w-[180px]">
        </router-link>
        </div>
        </div>
    </div>
</template>