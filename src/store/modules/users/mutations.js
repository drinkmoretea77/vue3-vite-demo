export default {
  setUsers(state, payload) {
    state.users.push(...payload);
    state.users.sort((b, a) => {
      if (a.registration_timestamp > b.registration_timestamp) {
        return 1;
      }
      if (a.registration_timestamp < b.registration_timestamp) {
        return -1;
      }
      return 0;
    });
  },
  increasePage(state) {
    state.page += 1;
  },
  totalPages(state, payload) {
    state.totalPages = payload;
  },
};
