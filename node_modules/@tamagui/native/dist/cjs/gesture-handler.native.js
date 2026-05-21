"use strict";

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
var gesture_handler_exports = {};
__export(gesture_handler_exports, {
  PressBoundary: () => import_PressBoundary.PressBoundary,
  getGestureHandler: () => import_gestureState.getGestureHandler,
  getGestureHandlerConfig: () => import_setup_gesture_handler.getGestureHandlerConfig,
  setupGestureHandler: () => import_setup_gesture_handler.setupGestureHandler,
  unstable_claimExternalPressOwnership: () => import_gestureState2.claimExternalPressOwnership,
  unstable_releaseExternalPressOwnership: () => import_gestureState2.releaseExternalPressOwnership
});
module.exports = __toCommonJS(gesture_handler_exports);
var import_gestureState = require("./gestureState.native.js");
var import_gestureState2 = require("./gestureState.native.js");
var import_PressBoundary = require("./PressBoundary.native.js");
var import_setup_gesture_handler = require("./setup-gesture-handler.native.js");
//# sourceMappingURL=gesture-handler.native.js.map
