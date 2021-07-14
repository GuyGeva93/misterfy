import Vue from 'vue'
import Vuex from 'vuex'
import { stationStore } from './modules/station-store.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        stationStore
    }
})