<template>
  <div>
    <input v-model="query" placeholder="영화 제목 입력" />
    <button @click="onsearchYoutube">검색</button>
    <YouTubeCard
      v-for="video in store.youtubeList"
      :key="video.id.videoId"
      :video="video"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useYoutubeStore } from '@/stores/youtube.js'
import YouTubeCard from '@/components/YoutubeCard.vue'

const query = ref('')
const store = useYoutubeStore()

const onsearchYoutube = () => {
  store.searchYoutube(10, query.value)
}
</script>