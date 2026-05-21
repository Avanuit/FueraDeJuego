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
var index_exports = {};
__export(index_exports, {
  NativeMenuContext: () => import_nativeMenuContext.NativeMenuContext,
  NativePortal: () => import_components.NativePortal,
  NativePortalHost: () => import_components.NativePortalHost,
  NativePortalProvider: () => import_components.NativePortalProvider,
  getBurnt: () => import_burntState.getBurnt,
  getGestureHandler: () => import_gestureState.getGestureHandler,
  getKeyboardControllerState: () => import_keyboardControllerState.getKeyboardControllerState,
  getLinearGradient: () => import_linearGradientState.getLinearGradient,
  getPortal: () => import_portalState.getPortal,
  getSafeArea: () => import_safeAreaState.getSafeArea,
  getWorklets: () => import_workletsState.getWorklets,
  getZeego: () => import_zeegoState.getZeego,
  isKeyboardControllerEnabled: () => import_keyboardControllerState.isKeyboardControllerEnabled,
  setKeyboardControllerState: () => import_keyboardControllerState.setKeyboardControllerState,
  unstable_claimExternalPressOwnership: () => import_gestureState2.claimExternalPressOwnership,
  unstable_releaseExternalPressOwnership: () => import_gestureState2.releaseExternalPressOwnership
});
module.exports = __toCommonJS(index_exports);
var import_portalState = require("./portalState.cjs");
var import_gestureState = require("./gestureState.cjs");
var import_gestureState2 = require("./gestureState.cjs");
var import_workletsState = require("./workletsState.cjs");
var import_safeAreaState = require("./safeAreaState.cjs");
var import_linearGradientState = require("./linearGradientState.cjs");
var import_keyboardControllerState = require("./keyboardControllerState.cjs");
var import_zeegoState = require("./zeegoState.cjs");
var import_nativeMenuContext = require("./nativeMenuContext.cjs");
var import_burntState = require("./burntState.cjs");
var import_components = require("./components.cjs");