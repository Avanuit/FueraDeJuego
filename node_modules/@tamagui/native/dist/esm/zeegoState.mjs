import { createGlobalState } from "./globalState.mjs";
const state = createGlobalState(`zeego`, {
  enabled: false,
  DropdownMenu: null,
  ContextMenu: null
});
function getZeego() {
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
export { getZeego };
//# sourceMappingURL=zeegoState.mjs.map
