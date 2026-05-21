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
var mainThreadPressEvents_native_exports = {};
__export(mainThreadPressEvents_native_exports, {
  useMainThreadPressEvents: () => useMainThreadPressEvents
});
module.exports = __toCommonJS(mainThreadPressEvents_native_exports);
var import_react = require("react");
var DEFAULT_LONG_PRESS_DELAY = 500;
var DEFAULT_MIN_PRESS_DURATION = 130;
function useMainThreadPressEvents(events, viewProps) {
  var enabled = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true,
    debugName = arguments.length > 3 ? arguments[3] : void 0;
  var ref = (0, import_react.useRef)(null);
  if (!ref.current) {
    ref.current = {
      state: "idle",
      pressInTimer: null,
      pressOutTimer: null,
      longPressTimer: null,
      activateTime: 0
    };
  }
  if (!enabled || !events) return;
  var _events_delayPressIn;
  var delayPressIn = Math.max(0, (_events_delayPressIn = events.delayPressIn) !== null && _events_delayPressIn !== void 0 ? _events_delayPressIn : 0);
  var _events_delayPressOut;
  var delayPressOut = Math.max(0, (_events_delayPressOut = events.delayPressOut) !== null && _events_delayPressOut !== void 0 ? _events_delayPressOut : 0);
  var _events_delayLongPress;
  var delayLongPress = Math.max(0, (_events_delayLongPress = events.delayLongPress) !== null && _events_delayLongPress !== void 0 ? _events_delayLongPress : DEFAULT_LONG_PRESS_DELAY);
  var _events_minPressDuration;
  var minPressDuration = Math.max(0, (_events_minPressDuration = events.minPressDuration) !== null && _events_minPressDuration !== void 0 ? _events_minPressDuration : DEFAULT_MIN_PRESS_DURATION);
  function activate(e) {
    var _events_onPressIn;
    ref.current.state = "active";
    ref.current.activateTime = Date.now();
    (_events_onPressIn = events.onPressIn) === null || _events_onPressIn === void 0 ? void 0 : _events_onPressIn.call(events, e);
  }
  function deactivate(e) {
    var pressDuration = Date.now() - ref.current.activateTime;
    var remaining = Math.max(minPressDuration - pressDuration, delayPressOut);
    if (remaining > 0) {
      ref.current.pressOutTimer = setTimeout(function () {
        var _events_onPressOut2;
        (_events_onPressOut2 = events.onPressOut) === null || _events_onPressOut2 === void 0 ? void 0 : _events_onPressOut2.call(events, e);
      }, remaining);
    } else {
      var _events_onPressOut;
      (_events_onPressOut = events.onPressOut) === null || _events_onPressOut === void 0 ? void 0 : _events_onPressOut.call(events, e);
    }
  }
  function cleanup() {
    if (ref.current.pressInTimer) clearTimeout(ref.current.pressInTimer);
    if (ref.current.pressOutTimer) clearTimeout(ref.current.pressOutTimer);
    if (ref.current.longPressTimer) clearTimeout(ref.current.longPressTimer);
    ref.current.pressInTimer = null;
    ref.current.pressOutTimer = null;
    ref.current.longPressTimer = null;
  }
  viewProps.onStartShouldSetResponder = function () {
    return !events.disabled;
  };
  viewProps.onResponderGrant = function (e) {
    cleanup();
    ref.current.state = "pressing";
    if (delayPressIn > 0) {
      ref.current.pressInTimer = setTimeout(function () {
        return activate(e);
      }, delayPressIn);
    } else {
      activate(e);
    }
    if (events.onLongPress) {
      ref.current.longPressTimer = setTimeout(function () {
        if (ref.current.state === "active") {
          var _events_onLongPress;
          ref.current.state = "longPressed";
          (_events_onLongPress = events.onLongPress) === null || _events_onLongPress === void 0 ? void 0 : _events_onLongPress.call(events, e);
        }
      }, delayLongPress + delayPressIn);
    }
  };
  viewProps.onResponderRelease = function (e) {
    var wasLongPressed = ref.current.state === "longPressed";
    cleanup();
    if (ref.current.state === "pressing") {
      activate(e);
    }
    if (!wasLongPressed) {
      var _events_onPress;
      (_events_onPress = events.onPress) === null || _events_onPress === void 0 ? void 0 : _events_onPress.call(events, e);
    }
    deactivate(e);
    ref.current.state = "idle";
  };
  viewProps.onResponderTerminate = function (e) {
    cleanup();
    if (ref.current.state === "active" || ref.current.state === "longPressed") {
      deactivate(e);
    }
    ref.current.state = "idle";
  };
  viewProps.onResponderTerminationRequest = function () {
    return events.cancelable !== false;
  };
  viewProps.onResponderMove = function (e) {
    var _events_onPressMove;
    (_events_onPressMove = events.onPressMove) === null || _events_onPressMove === void 0 ? void 0 : _events_onPressMove.call(events, e);
  };
}
//# sourceMappingURL=mainThreadPressEvents.native.js.map
