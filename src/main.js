import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vueDebounce from 'vue-debounce'
import './style/style.scss'
Vue.config.productionTip = false
import AudioVisual from 'vue-audio-visual'


import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);
Vue.use(AudioVisual)

Vue.use(vueDebounce, {
    defaultTime: '700ms'
})
Vue.use(VuePlyr, {
    plyr: {}
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')