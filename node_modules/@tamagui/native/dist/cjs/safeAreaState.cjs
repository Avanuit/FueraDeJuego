var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var safeAreaState_exports = {};
__export(safeAreaState_exports, {
  getSafeArea: () => getSafeArea
});
module.exports = __toCommonJS(safeAreaState_exports);
var import_globalState = require("./globalState.cjs");
const state = (0, import_globalState.createGlobalState)(`safe_area`, {
  enabled: false,
  useSafeAreaInsets: null,
  useSafeAreaFrame: null,
  initialMetrics: null
});
const defaultInsets = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
const defaultFrame = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};
function getSafeArea() {
  return {
    get isEnabled() {
      return state.get().enabled;
    },
    get state() {
      return state.get();
    },
    set(updates) {
      Object.assign(state.get(), updates);
    },
    getInsets() {
      const s = state.get();
      if (!s.enabled || !s.initialMetrics) {
        return defaultInsets;
      }
      return s.initialMetrics.insets;
    },
    getFrame() {
      const s = state.get();
      if (!s.enabled || !s.initialMetrics) {
        return defaultFrame;
      }
      return s.initialMetrics.frame;
    }
  };
}