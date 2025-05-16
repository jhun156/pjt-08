<template>
  <div>
    <input v-model="query" placeholder="영화 제목 입력" />
    <button @click="searchYoutube">검색</button>
  </div>
</template>

<script setup>
  import { useYoutubeStore } from "@/stores/youtube.js";
  import { ref } from 'vue';
  import axios from 'axios';

  const stores=useYoutubeStore()
  const query=ref('') // 검색어 변수
  const searchYoutube = () => {
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: `${query.value} 리뷰`,  // 👈 여기!! 인코딩 하지 말 것!!
        type: 'video',
        maxResults: 10,
        key: API_KEY,
      }
    })
    .then((response) => {
      stores.addyoutube(response.data.items);
      console.log("유튜브 응답:", response.data.items);
    })
    .catch((error) => {
      console.error("YouTube API 요청 실패:", error);
      console.log("에러 응답 내용:", error.response?.data);
    });
}


</script>

<style scoped>

</style>
