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

import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// import { faHeart } from '@fortawesome/free-solid-svg-icons'

// library.add(faUserSecret)
// library.add(faHeart)

// Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.config.productionTip = false
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