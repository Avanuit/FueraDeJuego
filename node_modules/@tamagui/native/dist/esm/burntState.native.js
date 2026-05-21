import { createGlobalState } from "./globalState.native.js";
var state = createGlobalState(`burnt`, {
  enabled: false,
  toast: null,
  dismissAllAlerts: null
});
function getBurnt() {
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
export { getBurnt };
//# sourceMappingURL=burntState.native.js.map
