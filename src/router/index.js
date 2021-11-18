import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '@/views/index.vue';
import lab from '@/views/lab.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'index', component: index },
    { path: '/lab', name: 'lab', component: lab }
];

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    base: '/demo',
    routes
});

export default router;
