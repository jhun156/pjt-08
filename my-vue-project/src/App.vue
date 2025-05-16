<template>
  <header>
    <nav>
      <RouterLink>
        <img src="" alt="#">
      </RouterLink>
      <div>
        <RouterLink :to="{ name: 'MovieList' }">영화조회</RouterLink> |
        <RouterLink :to="{ name: 'ReviewSearch' }">리뷰검색</RouterLink> |
        <RouterLink :to="{ name: 'Recommended' }">영화추천</RouterLink>
      </div>
    </nav>
  </header>
  <RouterView/>

</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  
</script>

<style scoped>

</style>