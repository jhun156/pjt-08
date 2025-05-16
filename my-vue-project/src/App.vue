<template>
  <header>
    <nav>
      <RouterLink>
        <img src="" alt="#">
      </RouterLink>
      <div>
        <RouterLink>영화조회</RouterLink> |
        <RouterLink>리뷰검색</RouterLink> |
        <RouterLink>영화추천</RouterLink>
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