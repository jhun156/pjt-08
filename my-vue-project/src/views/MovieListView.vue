<template>
  <div>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <div>
          <img :src="movie.poster_path" alt="영화 이미지">
          <h5>{{ movie.title }}</h5>
          <p>{{ movie.overview }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { useTMDBStore } from '@/stores/tmdb.js'
  import { ref } from 'vue'

  const store = useTMDBStore()
  const movies = ref([])

  movies.value = store.fetchTopRatedMovies()
</script>

<style scoped>

</style>