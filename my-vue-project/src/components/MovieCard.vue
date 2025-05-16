<template>
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
</template>

<script setup>
  const props = defineProps({
    movie: Object
  })
</script>

<style scoped>

</style>