<template>
  <div>
    <img 
      :src="video.snippet.thumbnails.medium.url" 
      :alt="video.snippet.title" 
      @click="openModal" 

    />
    <h3>{{ video.snippet.title }}</h3>
    <p>{{ video.snippet.description }}</p>

    <!-- 모달이 열리면 YoutubeReviewModal 렌더링 -->
    <YoutubeReviewModal 
      v-if="isModalOpen" 
      :videoId="video.id.videoId"
      :videotitle="video.snippet.title" 
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import YoutubeReviewModal from './YoutubeReviewModal.vue'

const props = defineProps({
  video: Object,
})

const isModalOpen = ref(false)

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}
</script>
