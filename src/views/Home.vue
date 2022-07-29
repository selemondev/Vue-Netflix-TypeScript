<script setup lang="ts">
import Banner from "../components/Banner.vue";
import Row from "@/components/Row.vue";
import requests from "@/Requests/requests";
</script>

<template>
  <main>
    <Banner/>
      <div class="pt-2 md:pt-20">
        <Row title="Trending" largeImage :fetchUrl="requests.fetchTrending"/>
        <Row title="Netflix Originals" :fetchUrl="requests.fetchNetflixOriginals"/>
        <Row title="Top Rated" :fetchUrl="requests.fetchTopRated"/>
        <Row title="Action Movies" :fetchUrl="requests.fetchActionMovies"/>
        <Row title="Comedy Movies" :fetchUrl="requests.fetchComedyMovies"/>
        <Row title="Horror Movies" :fetchUrl="requests.fetchHorrorMovies"/>
    </div>
  </main>
</template>
