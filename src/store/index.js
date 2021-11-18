import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    info: { name: '中国', level: 0 }
};

const mutations = {
    changeInfo(state, payload) {
        state.info.name = payload.name;
        state.info.level = payload.level;
    }
};

export default new Vuex.Store({
    state,
    mutations
});
