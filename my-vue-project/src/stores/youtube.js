import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useYoutubeStore = defineStore('youtube', () => {
  const youtubeList=ref([])
  const addyoutube=function(list){
    youtubeList.value=list
  }
  return { youtubeList,addyoutube }
})
