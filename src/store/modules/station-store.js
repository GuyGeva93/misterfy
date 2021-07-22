import { stationService } from "@/services/station-service.js";
import { youtubeService } from "../../services/youtube-service";
import { socketService } from '../../services/socket-service';
// import { RegExp } from 'core-js/web';

export const stationStore = {
    strict: true,
    state: {
        stations: [],
        tags: [],
        currStation: null,
        currSong: null,
        filterBy: { name: '', tag: '' },
        sortBy: { tags: [] }
    },
    getters: {
        stationsToDisplay({ stations }) { return stations },
        tags(state) { return state.tags },
        currStation(state) { return state.currStation },
        filterBy(state) { return state.filterBy },
        sortBy(state) { return state.sortBy },
    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations
        },
        setTags(state, { tags }) {
            state.tags = tags;
        },
        setFilter(state, { filterBy = { name: '', tag: '' } }) {
            state.filterBy = filterBy
        },
        actions: {
            async loadStations({ commit, state }) {
                try {
                    const data = await stationService.query(state.filterBy)
                    commit({ type: 'setStations', stations: data.stations })
                    return data;
                } catch (err) {
                    console.log('Error on loadStations =>', err)
                }
            },
            async removeStation({ commit }, { stationId }) {
                try {
                    await stationService.remove(stationId)
                    commit({ type: 'removeStation', stationId })

                } catch (err) {
                    console.log('Error on removeStation =>', err)
                    throw err;
                }
            },
            async saveStation({ commit }, { station }) {
                try {
                    const type = (station._id) ? 'updateStation' : 'addStation'
                    const updatedStation = await stationService.save(station)
                    commit({ type, updatedStation })
                    return updatedStation;
                } catch (err) {
                    console.log('Error on saveStation =>', err)
                    throw err;
                }
            },
            async setFilter({ commit }, { sortBy, filterBy }) {
                try {
                    const stations = await stationService.query(filterBy, sortBy)
                    commit({ type: 'setFilter', sortBy, filterBy, stations })
                    commit({ type: 'setStations', stations })
                } catch (err) {
                    console.log('Error on setFilter =>', err)
                }
            },
            async addSong({ commit }, { song, stationId }) {
                try {
                    song.duration = await youtubeService.getDuration(song.id.videoId)
                    song.snippet.title = await youtubeService.getTitle(song.snippet.title)
                    const updatedStation = await stationService.saveSong(song, stationId)
                    commit({ type: 'saveSong', updatedStation })
                    socketService.emit('station updated', updatedStation);
                    return updatedStation;
                } catch (err) {
                    console.log('Error on addSong =>', err)
                    throw err;
                }
            },
            async removeSong({ commit, state }, { songId }) {
                try {
                    const updatedStation = await stationService.removeSong(songId, state.currStation._id)
                    commit({ type: 'removeSong', updatedStation })
                    socketService.emit('station updated', updatedStation);
                    return updatedStation;
                } catch (err) {
                    console.log('Error on removeSong =>', err)
                    throw err;
                }
            },
            async currStation({ commit }, { stationId }) {
                try {
                    const currStation = await stationService.getById(stationId)
                    commit({ type: 'setCurrStation', currStation })
                } catch (err) {
                    console.log('Error on currStation =>', err)
                }
            },
            async setListOrder({ commit }, { list, stationId }) {
                commit({ type: 'setListOrder', list })
                try {
                    const updatedStation = await stationService.saveSongList(list, stationId)
                    socketService.emit('station updated', updatedStation);
                } catch (err) {
                    console.log('Error on setListOrder =>', err)
                }
            }
        }
    }
};