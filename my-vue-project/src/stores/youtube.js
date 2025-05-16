import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useYoutubeStore = defineStore('youtube', () => {
  const youtubeList = ref([])

  const addyoutube = (list) => {
    youtubeList.value = list
  }

  const searchYoutube = (num, query) => {
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: `${query} 리뷰`,
        type: 'video',
        maxResults: num,
        key: API_KEY,
      },
    })
      .then((response) => {
        addyoutube(response.data.items)
      })
      .catch((error) => {
        console.error('YouTube API 요청 실패:', error)
      })
  }

  return { youtubeList, addyoutube, searchYoutube }
})