<template>
  <div class="container py-4">
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4 mb-4"
        v-for="movie in movies"
        :key="movie.id"
      >
        <RouterLink :to="{ name: 'MovieDetail', params: { movieId: movie.id }}">
          <div class="card h-100 shadow-sm">
            <img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              class="card-img-top"
              alt="영화 이미지"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">{{ movie.overview }}</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
  <RouterView/>
</template>

<script setup>
  import { RouterLink, RouterView} from 'vue-router'
  import { useTMDBStore } from '@/stores/tmdb.js'
  import { ref, onMounted } from 'vue'

  const store = useTMDBStore()
  const movies = ref([])

  onMounted(async () => {
    movies.value = await store.fetchTopRatedMovies()
  })

</script>

<style scoped>

</style>