import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { View } from "react-native";
import { claimExternalPressOwnership, releaseExternalPressOwnership } from "./gestureState.native.js";
function composeFirst(ours, theirs) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    ours(...args);
    theirs === null || theirs === void 0 ? void 0 : theirs(...args);
  };
}
function composeLast(theirs, ours) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    theirs === null || theirs === void 0 ? void 0 : theirs(...args);
    ours(...args);
  };
}
var PressBoundary = /* @__PURE__ */React.forwardRef(function PressBoundary2(param, forwardedRef) {
  var {
    enabled,
    stopPropagation,
    debugName,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    onResponderGrant,
    onResponderRelease,
    onResponderTerminate,
    ...props
  } = param;
  var tokenRef = React.useRef(null);
  var _ref;
  var isEnabled = (_ref = enabled !== null && enabled !== void 0 ? enabled : stopPropagation) !== null && _ref !== void 0 ? _ref : true;
  var claim = React.useCallback(function () {
    if (!isEnabled) return;
    if (tokenRef.current) {
      releaseExternalPressOwnership(tokenRef.current, debugName);
    }
    tokenRef.current = claimExternalPressOwnership(debugName);
  }, [debugName, isEnabled]);
  var release = React.useCallback(function () {
    if (!tokenRef.current) return;
    releaseExternalPressOwnership(tokenRef.current, debugName);
    tokenRef.current = null;
  }, [debugName]);
  React.useEffect(function () {
    return release;
  }, [release]);
  return /* @__PURE__ */_jsx(View, {
    ref: forwardedRef,
    ...props,
    onTouchStart: composeFirst(claim, onTouchStart),
    onTouchEnd: composeLast(onTouchEnd, release),
    onTouchCancel: composeLast(onTouchCancel, release),
    onResponderGrant: composeFirst(claim, onResponderGrant),
    onResponderRelease: composeLast(onResponderRelease, release),
    onResponderTerminate: composeLast(onResponderTerminate, release)
  });
});
export { PressBoundary };
//# sourceMappingURL=PressBoundary.native.js.map
