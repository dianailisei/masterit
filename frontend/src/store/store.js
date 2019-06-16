import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate'
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {},
    lastSprint: {},
    team: [],
    questions: [],
    goodPractices: [],
    feedbackTests:[],
    lastFeedbackTest: {}
  },
  actions,
  getters,
  mutations,
  plugins: [createPersistedState()]
});