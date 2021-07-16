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
        playSong() {

        }
    },
    actions: {}
};

// export const stationStore = new Vuex.Store(options)