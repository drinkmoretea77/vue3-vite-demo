export default {
  async fetchPositions({ commit, state }) {
    const response = await fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/positions`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    }

    const { positions } = responseData;
    commit('setPositions', positions);
  },
};
