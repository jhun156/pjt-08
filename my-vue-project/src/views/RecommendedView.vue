<template>
  <div>
    <h2>오늘의 광주 날씨에 따른 영화 추천</h2>
    <p>현재 날씨: {{ currentWeather }}</p>
    <div v-if="recommendedMovies.length > 0">
      <h3>추천 영화</h3>
      <div v-for="movie in recommendedMovies" :key="movie.videoId" class="movie-item">
        <img
          :src="movie.thumbnail"
          :alt="movie.title"
          width="120"
          style="cursor: pointer;"
          @click="openModal(movie.videoId, movie.title)"
        >
        <p style="cursor: pointer;" @click="openModal(movie.videoId, movie.title)">{{ movie.title }}</p>
      </div>
    </div>
    <p v-else-if="!error && currentWeather">추천 영화를 불러오는 중...</p>
    <p v-if="error">{{ error }}</p>

    <MovieModal
      v-if="showModal"
      :videoId="selectedVideoId"
      :videotitle="selectedVideoTitle"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MovieModal from '@/components/RecommendeModal.vue'; // MovieModal 컴포넌트 import (경로 확인)

const currentWeather = ref('');
const recommendedMovies = ref([]);
const error = ref('');

// 모달 관련 상태
const showModal = ref(false);
const selectedVideoId = ref('');
const selectedVideoTitle = ref('');

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
const latitude = 35.1595454;
const longitude = 126.8526012;
const numberOfMoviesToFetch = 15;

async function fetchWeather() {
  try {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&lang=kr&units=metric`;
    const response = await fetch(weatherApiUrl);
    if (!response.ok) {
      throw new Error(`날씨 정보를 가져오는데 실패했습니다: ${response.status}`);
    }
    const weatherData = await response.json();
    currentWeather.value = `${weatherData.weather[0].description}, 온도: ${weatherData.main.temp}°C`;
    fetchMoviesFromYoutube(weatherData.weather[0].main);
  } catch (err) {
    error.value = err.message;
    console.error('날씨 정보 에러:', err);
  }
}

async function fetchMoviesFromYoutube(weatherCondition) {
  try {
    let searchQuery = '';
    if (weatherCondition === 'Clear') {
      searchQuery = '신나는 코미디 영화';
    } else if (weatherCondition === 'Rain' || weatherCondition === 'Drizzle' || weatherCondition === 'Thunderstorm') {
      searchQuery = '감성적인 드라마 영화';
    } else if (weatherCondition === 'Snow') {
      searchQuery = '따뜻한 판타지 영화';
    } else if (weatherCondition === 'Clouds') {
      searchQuery = '흥미진진한 스릴러 영화';
    } else {
      searchQuery = '추천 영화';
    }

    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${numberOfMoviesToFetch}&q=${searchQuery}&type=video&key=${youtubeApiKey}`;
    const response = await fetch(youtubeApiUrl);
    if (!response.ok) {
      throw new Error(`YouTube 영화 정보를 가져오는데 실패했습니다: ${response.status}`);
    }
    const youtubeData = await response.json();
    recommendedMovies.value = youtubeData.items.map(item => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
  } catch (err) {
    error.value = `YouTube API 에러: ${err.message}`;
    console.error('YouTube API 에러:', err);
  }
}

function openModal(videoId, videoTitle) {
  selectedVideoId.value = videoId;
  selectedVideoTitle.value = videoTitle;
  showModal.value = true;
}

function closeModal() {
  selectedVideoId.value = '';
  selectedVideoTitle.value = '';
  showModal.value = false;
}

onMounted(() => {
  fetchWeather();
});
</script>

<style scoped>
.movie-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.movie-item img {
  margin-right: 10px;
}

.movie-item p {
  margin: 0;
}
</style>