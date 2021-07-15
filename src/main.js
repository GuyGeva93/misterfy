import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vueDebounce from 'vue-debounce'
import './style/style.scss'
Vue.config.productionTip = false

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'


Vue.config.productionTip = false

Vue.use(vueDebounce, {
  defaultTime: '700ms'
})
Vue.use(VuePlyr, {
  plyr: {}
})

// window.onYouTubeIframeAPIReady = () => {
//     console.log("onYouTubeIframeAPIReady")
//     App.initYoutube()

// }


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')