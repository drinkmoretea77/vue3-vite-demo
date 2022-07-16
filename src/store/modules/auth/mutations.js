export default {
    setPositions(state, payload) {
        state.positions = payload;
    },
    register(state) {
        state.success = true;
    }
}