import { stationService } from "@/services/station-service.js";

export const stationStore = {
    strict: true,
    state: {
        stations: [],
        filterBy: {},
        sortBy: { tags: [] }
    },
    getters: {
        stationToDisplay(state) {
            let stations = state.stations
            return stations
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
        setFilter(state, { sortBy, filterBy }) {
            // console.log(sortBy);
            state.sortBy = sortBy
            state.filterBy = filterBy
        },
        removeStation(state, { stationId }) {
            const idx = state.stations.findIndex(station => station._id === stationId)
            state.stations.splice(idx, 1)
        },
        // updateStation(state, payload) {
        //     console.log(payload.station);
        //     const idx = state.stations.findIndex(stations => stations._id === payload.station._id)
        //         // console.log(state);
        //         // state.stations[idx].name = payload.station.name
        //         // state.stations[idx].price = +payload.station.price
        //         // state.stations[idx].createdAt = payload.station.createdAt
        //         // state.stations[idx].inStock = payload.station.inStock
        // },
        addStation(state, { station }) {
            console.log(station);
            state.stations.push(station)
        },
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
        saveStation({ commit }, payload) {
            console.log(payload.station);
            const type = (payload.station._id) ? 'updateStation' : 'addStation'
            return stationService.save(payload.station)
                .then(savedStation => {
                    commit({ type, station: savedStation })
                })
        },
        setFilter({ commit }, { sortBy, filterBy }) {
            // console.log(sortBy);
            // console.log(filterBy);
            return stationService.query(filterBy, sortBy)
                .then(stations => {
                    commit({ type: 'setFilter', sortBy, filterBy, stations })
                    commit({ type: 'setStations', stations })
                })

        }
    }
};

// export const stationStore = new Vuex.Store(options)