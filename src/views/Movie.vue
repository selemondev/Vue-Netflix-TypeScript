<script lang="ts">
import { defineComponent, ref } from 'vue';
import { YoutubeVue3 } from 'youtube-vue3';
import axios from "../Axios/axios";
import movieTrailer from "movie-trailer";
import type { MovieTypes } from '@/Types/movieDataTypes';
import { useRoute } from 'vue-router';
const API_KEY = import.meta.env.VITE_API_KEY;
export default defineComponent({
  components: {
    YoutubeVue3
  },
  data() {
    return {
        play: false,
    }
  },
  setup() {
    const route = useRoute();
    const params = route.params.id;
    const movie = ref<MovieTypes[] | any>([]);
    const trailer = ref<string | any>("");
    const open = ref<boolean>(false);
    // const play = ref<boolean>(false);
    const baseURL = "https://image.tmdb.org/t/p/original/";
    const searchMovieUrl = `https://api.themoviedb.org/3/movie/${params}?api_key=${API_KEY}&language=en-US`;
    const getMovie = async () => {
    const response = await axios.get(searchMovieUrl);
    movie.value = response.data;
    console.log(movie.value)
    };
    getMovie();
    const truncate = (value:string | any, n:number) => {
        return value?.length > n ? value.substring(0, n-1) + "..." : value;
    };
    const watchTrailer = async (movie:MovieTypes) => {
        open.value = true;
             movieTrailer(null ,{ tmdbId: movie.id })
                   .then((url:string)=>{
                     const urlParams = new URLSearchParams(new URL(url).search);
                     trailer.value = urlParams.get("v");
            })
        .catch((error:string)=> console.log(error));
    };
    return {
        movie,
        baseURL,
        truncate,
        trailer,
        watchTrailer,
        open,
    }
  },

  methods: {
        playCurrentVideo() {
            this.$refs.youtube.player.playVideo();
            this.play = true;
        },
        pauseCurrentVideo() {
            this.$refs.youtube.player.pauseVideo();
            this.play = false;
        },
  }
})
</script>
<template>
  <div class="w-full min-h-screen">
     <div class="absolute top-0 bottom-0 -z-10 w-full">
        <img :src="`${baseURL}${movie?.backdrop_path}`" class="w-full h-full object-cover" />
      </div>
      <div>
        <button class="btn text-white hover:text-red-500 transition duration-200 ease-in"><router-link to="/"><i class="fa-solid fa-arrow-left mr-2"></i></router-link></button>
      </div>

      <div>
        <Teleport to="#modal">
           <div class="fixed z-999 top-4 left-2 md:top-64 md:left-[15%] lg:top-10 lg:left-[25%]" v-if="open">
             <div class="h-[500px] bg-black w-[300px] relative sm:w-[500px] md:w-[600px]">
            <div class="relative">
                <div class="absolute w-8 h-8 bg-black bg-opacity-75 hover:bg-gray-800 rounded-full cursor-pointer flex items-center text-white justify-center top-1 right-1">
                    <i @click="open = false" class="fa-solid fa-xmark"></i>
                </div>
                <YoutubeVue3 ref="youtube" :videoid="trailer" class="w-[300px] md:h-[300px] md:w-[600px]"/>
                <div class="pl-4">
                   <div class="flex items-center mt-2 space-x-4">
                     <div v-if="!play">
                         <button @click="playCurrentVideo()" class="py-1 px-4 rounded-sm bg-white hover:bg-gray-200 transition duration-200 ease-in items-center text-black space-x-2">
                         <i class="fa-solid fa-play md:text-xl"></i>
                         <span class="font-bold text-base md:text-xl">Play</span>
                         </button>
                    </div>

                     <div v-if="play">
                         <button @click="pauseCurrentVideo()" class="py-1 px-4 rounded-sm bg-white hover:bg-gray-200 transition duration-200 ease-in items-center text-black space-x-2">
                         <i class="fa-solid fa-pause md:text-xl"></i>
                         <span class="font-bold text-base md:text-xl">Pause</span>
                         </button>
                    </div>

                    <div>
                         <div class="w-8 h-8 border border-gray-200 hover:text-gray-200 rounded-full cursor-pointer flex items-center text-white justify-center">
                            <i class="fa-solid fa-plus md:text-xl"></i>
                        </div>
                    </div>

                   </div>
                </div>
            </div>

            <div class="pl-4 py-4 space-y-2 h-[140px] overflow-y-auto">
             <div>
               <p class="text-gray-300">
                Rating: 
                <span :class="[ movie.vote_average > 5 ? 'text-green-500' : 'text-red-500']">{{ movie?.vote_average.toFixed(0)}}</span>
               </p>
             </div>

             <div>
              <p class="text-gray-300">{{ movie.overview }}</p>
             </div>
            </div>
             </div>
           </div>
        </Teleport>
      </div>
     <div class="grid place-items-start md:pt-20 pt-14">
        <div class=" md:w-[800px] bg-black rounded-md md:ml-2 bg-opacity-20 backdrop-blur-xl w-80 h-96 pt-10 flex md:justify-center justify-around items-center">
            <div class="md:w-72 w-32">
                <img :src="`${baseURL}${movie?.poster_path}`" :alt="`${movie.title}`" class="w-62 h-72 md:ml-2">
            </div>
            <div class="md:w-96 w-32 h-72 md:-ml-5 overflow-y-scroll md:overflow-hidden">
                <h2 class="font-bold md:text-3xl mb-2 text-white">{{movie.title}}</h2>
                <p class="text-white">- {{truncate(movie.overview, 300)}}</p>

                <div>
                <button @click="watchTrailer(movie)" class="py-1.5 px-4 rounded-sm mt-5 bg-white hover:bg-gray-200 transition duration-200 ease-in items-center text-black space-x-2 md:space-x-3">
                <i class="fa-solid fa-play"></i>
                <span class="font-bold text-base">Trailer</span>
                </button>
                </div>
            </div>
        </div>
     </div>
  </div>
</template>
