export default {
  async fetchUsers({ commit, state }) {
    const currentPage = state.page;
    const numToLoad = 6;
    const response = await fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage}&count=${numToLoad}`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    }

    const { users, total_pages } = responseData;

    commit("setUsers", users);
    commit("increasePage");
    commit("totalPages", total_pages);
  },
};
