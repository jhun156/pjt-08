<template>
  <div>
    <h1>dfdfdf</h1>
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="영화 디테일 이미지">
  </div>
</template>

<script setup>
  import { useTMDBStore } from '@/stores/tmdb.js'
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'

  const route = useRoute()
  const store = useTMDBStore()

  const movieId = route.params.movieId
  const movie = ref([])

  onMounted(async () => {
    movie.value = await store.fetchDetailMovie(movieId)
    console.log(movie.value)
  })
</script>

<style scoped>

</style>