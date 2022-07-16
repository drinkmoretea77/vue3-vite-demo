export default {
  async fetchPositions({ commit }) {
    const response = await fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/positions`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error("Failed to fetch positions.");
      throw error;
    }

    const { positions } = responseData;
    commit("setPositions", positions);
  },

  async registerUser({ commit }, data) {
    const tokenResponse = await fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/token`
    );
    const responseData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      const error = new Error("Failed to fetch token.");
      throw error;
    }

    const { token } = responseData;

    const headers = new Headers();
    headers.append("token", token);

    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("position_id", data.position_id);
    formdata.append("phone", data.phone);
    formdata.append("photo", data.photo);

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: formdata,
    };

    const response = await fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users",
      requestOptions
    );

    if (!response.ok) {
      const error = new Error("Failed to register.");
      throw error;
    }

    commit("register");
  },
};
