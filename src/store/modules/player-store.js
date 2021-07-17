// import { stationService } from "@/services/station-service.js";
// import { RegExp } from 'core-js/web';

export const playerStore = {
  strict: true,
  state: {
    currSongId: '',
    isPlaying: false
    // currSong: ''
  },
  getters: {
    currSongId(state) {
      return state.currSongId
    },
    currSong(state) {
      return state.currSong
    }
  },
  mutations: {
    loadSongToPlayer(state, { songId }) {
      state.currSongId = songId
    },
    nextSong(state) {
      const currStation = this.getters.currStation
      let idx = currStation.songs.findIndex(song => song.id === state.currSongId)
      if (idx === currStation.songs.length - 1) idx = -1
      const nextSong = currStation.songs[idx + 1]
      state.currSongId = nextSong.id
    },
    prevSong(state) {
      debugger
      const currStation = this.getters.currStation
      let idx = currStation.songs.findIndex(song => song.id === state.currSongId)
      if (!idx) idx = 1
      const nextSong = currStation.songs[idx - 1]
      state.currSongId = nextSong.id
    },
    isPlaying(state){
      state.isPlaying = !state.isPlaying
      console.log('state.isPlaying', state.isPlaying)
    }
    // currSongImg(state) {
    //   const currStation = this.getters.currStation
    //   const currSong = currStation.songs.find(song => song.id === state.currSongId)
    //   state.currSong = currSong
    // }
  },
  actions: {}
};

// export const stationStore = new Vuex.Store(options)