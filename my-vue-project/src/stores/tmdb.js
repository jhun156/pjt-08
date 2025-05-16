import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTMDBStore = defineStore('tmdb', () => {

  const API_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const API_ACCESS_KEY = import.meta.env.VITE_TMDB_ACCESS_KEY

  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_KEY}`
        }
      })
      return response.data.results  // 데이터값만 반환, 배열에 할당은 컴포넌트에서 진행(통일한 방식)
    } catch (error) {
      console.error('TMDB API 요청 실패', error)
      return [] // 실패시 빈 배열이라도 반환
    }
  }

  return { fetchTopRatedMovies }
})

