import { createGlobalState } from "./globalState.native.js";
var state = createGlobalState(`portal`, {
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
//# sourceMappingURL=portalState.native.js.map
