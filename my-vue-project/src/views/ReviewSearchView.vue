<template>
  <div>
    <input v-model="query" placeholder="영화 제목 입력" />
    <button @click="searchYoutube">검색</button>
  </div>
</template>

<script setup>
import { useYoutubeStore } from "@/stores/youtube.js"; // ✅ 오타 수정
import { ref } from 'vue';
import axios from 'axios';

const store = useYoutubeStore();
const query = ref(''); // 검색어

const searchYoutube = () => { // ✅ 함수 이름 오타 수정
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  axios({
    method: 'get',
    url: 'https://www.googleapis.com/youtube/v3/search',
    params: {
      part: 'snippet',
      q: `${query.value} 리뷰`,
      type: 'video',
      maxResults: 10,
      key: API_KEY,
    },
  })
    .then((response) => {
      // ✅ items로 수정
      store.addyoutube(response.data.items);
      console.log(store.youtubeList); // ref인지 reactive인지에 따라 .value 여부 다름
    })
    .catch((error) => {
      console.error('YouTube API 요청 실패:', error);
    });
};
</script>

<style scoped>
</style>
