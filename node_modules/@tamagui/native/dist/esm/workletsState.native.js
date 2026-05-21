import { createGlobalState } from "./globalState.native.js";
var state = createGlobalState(`worklets`, {
  enabled: false,
  Worklets: null,
  useRunOnJS: null,
  useWorklet: null,
  createWorkletContextValue: null
});
function getWorklets() {
  return {
    get isEnabled() {
      return state.get().enabled;
    },
    get state() {
      return state.get();
    },
    set(updates) {
      Object.assign(state.get(), updates);
    }
  };
}
export { getWorklets };
//# sourceMappingURL=workletsState.native.js.map
