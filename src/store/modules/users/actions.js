export default {
  async fetchUsers({ commit, state }, payload) {
    const update = payload && payload.update;
    const currentPage = update ? 1 : state.page;
    const numToLoad = 6;

    const response = await fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage}&count=${numToLoad}`
    );
    const responseData = await response.json();

    

    if (!response.ok) {
      const error = new Error(
        "Failed to fetch users."
      );
      throw error;
    }

    const { users, total_pages } = responseData;

    if (update) {
      commit("updateUsers", users);
    } else {
      commit("setUsers", users);
    }

    commit("increasePage");
    commit("totalPages", total_pages);
  },
};
