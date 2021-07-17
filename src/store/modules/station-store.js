import { stationService } from "@/services/station-service.js";
import { RegExp } from 'core-js/web';

export const stationStore = {
  strict: true,
  state: {
    stations: [],
    currStation: null,
    filterBy: { name: '', tag: '' },
    sortBy: { tags: [] }
  },
  getters: {
    stationsToDisplay(state) {
      let stations = state.stations;
      if (state.filterBy.name) {
        const nameSearch = new RegExp(state.filterBy.name, 'i');
        stations = stations.filter(station => nameSearch.test(station.name));
      }
      if (state.filterBy.tag) {
        stations = stations.filter(station => station.tags.includes(state.filterBy.tag));
      }
      return stations
    },
    tags(state) {
      const tags = state.stations.reduce(
        (acc, station) => {
          acc.push(...station.tags);
          return acc;
        }, ["All"]
      );
      return new Set(tags);
    },
    currStation(state) {
      return state.currStation
    },
    filterBy(state) {
      return state.filterBy
    },
    sortBy(state) {
      return state.sortBy
    },

  },
  mutations: {
    setStations(state, { stations }) {
      // console.log(stations);
      state.stations = stations;
    },
    setFilter(state, { filterBy = { name: '', tag: '' } }) {
      state.filterBy = filterBy
    },
    removeStation(state, { stationId }) {
      const idx = state.stations.findIndex(station => station._id === stationId)
      state.stations.splice(idx, 1)
    },
    saveSong(state, { updatedStation }) {
      const idx = state.stations.findIndex(station => station._id === updatedStation._id)
      state.stations.splice(idx, 1, updatedStation)
      state.currStation = updatedStation
    },
    removeSong(state, { updatedStation }) {
      const idx = state.stations.findIndex(station => station._id === updatedStation._id)
      state.stations.splice(idx, 1, updatedStation)
      state.currStation = updatedStation
      // const idx = state.currStation.songs.findIdx(song => song.id === songId)
      // const updatedStation = state.currStation.songs.splice(idx, 1)
      // state.currStation = updatedStation
    },
    setCurrStation(state, { currStation }) {
      state.currStation = currStation
    },
    addStation(state, { station }) {
      state.stations.push(station)
      state.currStation = station;
    },
    setListOrder(state, { songList }) {
      state.currStation.songs = songList
    }



    // updateStation(state, payload) {
    //     console.log(payload.station);
    //     const idx = state.stations.findIndex(stations => stations._id === payload.station._id)
    //         // console.log(state);
    //         // state.stations[idx].name = payload.station.name
    //         // state.stations[idx].price = +payload.station.price
    //         // state.stations[idx].createdAt = payload.station.createdAt
    //         // state.stations[idx].inStock = payload.station.inStock
    // },
  },
  actions: {
    loadStations({ commit, state }) {
      return stationService.query(state.filterBy, state.sortBy)
        .then(stations => {
          commit({ type: 'setStations', stations })
          return stations
        })
    },
    removeStation({ commit }, { stationId }) {
      return stationService.remove(stationId)
        .then(() => {
          commit({ type: 'removeStation', stationId })
        })
    },
    async saveStation({ commit }, payload) {
      const type = (payload.station._id) ? 'updateStation' : 'addStation'
      const station = await stationService.save(payload.station)
      commit({ type, station })
      return station;
    },
    setFilter({ commit }, { sortBy, filterBy }) {
      return stationService.query(filterBy, sortBy)
        .then(stations => {
          commit({ type: 'setFilter', sortBy, filterBy, stations })
          commit({ type: 'setStations', stations })
        })

    },
    async addSong({ commit }, { song, stationId }) {
      const updatedStation = await stationService.saveSong(song, stationId)
      commit({ type: 'saveSong', updatedStation })
    },
    async removeSong({ commit, state }, { songId }) {
      const updatedStation = await stationService.removeSong(songId, state.currStation._id)
      commit({ type: 'removeSong', updatedStation })
    },
    async currStation({ commit }, { stationId }) {
      const currStation = await stationService.getById(stationId)
      commit({ type: 'setCurrStation', currStation })
    },
    async setListOrder({ commit }, { list, stationId }) {
      const songList = await stationService.saveSongList(list, stationId)
      commit({ type: 'setListOrder', songList })
    }
  }
};