import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import explore from '../views/explore.vue';
import dashboard from '../views/dashboard.vue';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/explore',
        component: explore
    },
    {
        path: '/dashboard',
        component: dashboard
    }
]

const router = new VueRouter({
    routes
})

export default router