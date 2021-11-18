import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/index.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import 'normalize.css';

import '@/utils/registerMap.js';

import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap.js';
Vue.prototype.$echarts = echarts;

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

Vue.prototype.$dealStorage = (name, params) => {
    if (params) {
        localStorage.setItem(name, typeof params === 'object' ? JSON.stringify(params) : params);
    } else {
        const STR = localStorage.getItem(name);
        if (STR && STR[0] === '{' && STR[STR.length - 1] === '}') return JSON.parse(localStorage.getItem(name));
        return STR;
    }
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
