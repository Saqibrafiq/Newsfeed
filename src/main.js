import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    }
]

const router = new VueRouter ({
    routes
});


Vue.config.productionTip = false



new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
