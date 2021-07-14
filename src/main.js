import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/style.scss'
Vue.config.productionTip = false

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

Vue.use(VuePlyr, {
    plyr: {}
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')