// import { stationService } from "@/services/station-service.js";
// import { RegExp } from 'core-js/web';

export const playerStore = {
  strict: true,
  state: {
    currSongId: '',
  },
  getters: {
    currSongId(state) {
      return state.currSongId
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
      const currStation = this.getters.currStation
      let idx = currStation.songs.findIndex(song => song.id === state.currSongId)
      if (!idx) idx = 1
      const nextSong = currStation.songs[idx - 1]
      state.currSongId = nextSong.id
    }
  },
  actions: {}
};

// export const stationStore = new Vuex.Store(options)