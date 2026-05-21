import { createGlobalState } from "./globalState.mjs";
const state = createGlobalState(`portal`, {
  enabled: false,
  type: null
});
function getPortal() {
  return {
    get isEnabled() {
      return state.get().enabled;
    },
    get state() {
      return state.get();
    },
    set(newState) {
      state.set(newState);
    }
  };
}
export { getPortal };
//# sourceMappingURL=portalState.mjs.map
