<template>
  <h3>{{ movie.title }} 상세 페이지</h3>
  <p>개봉일: {{ movie.release_date }}</p>
  <p>러닝타임: {{ movie.runtime }}분</p>
  <p>TMDB 평점: {{ movie.vote_average }}</p>
  <h3 v-if="movie.genres && movie.genres.length >= 2">장르</h3>
  <p v-if="movie.genres && movie.genres.length >= 2">
    {{ movie.genres[0].name }} {{ movie.genres[1].name }}
  </p>
  <h3>줄거리</h3>
  <p>{{ movie.overview }}</p>
  <h3>공식 예고편</h3>
  <img src="@/assets/youtubebutton.png" alt="trailer" @click="openModal">
  <!-- 조건부 렌더링 -->
  <YoutubeTrailerModal 
    v-if="isModalOpen" 
    :movie="movie" 
    @close="closeModal" 
  />
</template>

<script setup>
import YoutubeTrailerModal from '@/components/YoutubeTrailerModal.vue'
import { ref } from 'vue'

const isModalOpen = ref(false)

const props = defineProps({
  movie: Object
})

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}
</script>