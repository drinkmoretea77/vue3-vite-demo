import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      users: [],
      page: 1,
      totalPages: 1,
    };
  },
  mutations,
  actions,
  getters
};