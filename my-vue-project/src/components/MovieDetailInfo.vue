<template>
  <div class="container py-4 movie-detail">
    <div class="image-wrapper">
      <img
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        alt="상세 이미지"
        class="movie-poster"
      />
    </div>
    <h3 class="text-center mb-3 text-primary fw-bold">{{ movie.title }} 상세 페이지</h3>
    <p class="text-center mb-1"><strong>개봉일:</strong> {{ movie.release_date }}</p>
    <p class="text-center mb-1"><strong>러닝타임:</strong> {{ movie.runtime }}분</p>
    <p class="text-center mb-3"><strong>TMDB 평점:</strong> {{ movie.vote_average }}</p>

    <div v-if="movie.genres && movie.genres.length >= 2" class="text-center mb-3">
      <h5 class="fw-semibold">장르</h5>
      <p>{{ movie.genres[0].name }} | {{ movie.genres[1].name }}</p>
    </div>

    <h5 class="fw-semibold text-center mb-2">줄거리</h5>
    <p class="mb-4">{{ movie.overview }}</p>

    <h5 class="fw-semibold text-center mb-3">공식 예고편</h5>
    <div class="d-flex justify-content-center mb-3">
      <img 
        src="@/assets/youtubebutton.png" 
        alt="trailer" 
        @click="openModal" 
        class="trailer-btn"
        role="button"
      />
    </div>

    <YoutubeTrailerModal 
      v-if="isModalOpen" 
      :movie="movie" 
      @close="closeModal" 
    />
  </div>
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

<style scoped>
.movie-detail {
  /* background-color: #121212; */
  color: black;
  min-height: 100vh;
  border-radius: 0.25rem;
  padding: 2rem 1rem;
}

.image-wrapper {
  display: flex;
  justify-content: center; /* 이미지 가운데 정렬 */
  margin-bottom: 1.5rem;
}

.movie-poster {
  max-width: 300px; /* 크기 줄임 */
  width: 100%;
  height: auto;
  background-color: transparent; /* 검은 배경 없애기 */
  border-radius: 8px;
  box-shadow: none; /* 혹시 그림자 있으면 제거 */
}

.movie-detail h3, .movie-detail h5 {
  color: #0d6efd; /* 부트스트랩 기본 파란색 */
  user-select: none;
}

.movie-detail p {
  color: black;
  user-select: text;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.trailer-btn {
  all: unset;
  width: 64px;
  height: 64px;
  cursor: pointer;
  filter: drop-shadow(0 0 4px rgba(255, 0, 0, 0.7));
}

.trailer-btn:hover {
  transform: scale(1.1);
}
</style>
