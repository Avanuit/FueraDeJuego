import React from "react";
import { View } from "react-native-web";
import { claimExternalPressOwnership, releaseExternalPressOwnership } from "./gestureState.mjs";
import { jsx } from "react/jsx-runtime";
function composeFirst(ours, theirs) {
  return (...args) => {
    ours(...args);
    theirs?.(...args);
  };
}
function composeLast(theirs, ours) {
  return (...args) => {
    theirs?.(...args);
    ours(...args);
  };
}
const PressBoundary = React.forwardRef(function PressBoundary2({
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
}, forwardedRef) {
  const tokenRef = React.useRef(null);
  const isEnabled = enabled ?? stopPropagation ?? true;
  const claim = React.useCallback(() => {
    if (!isEnabled) return;
    if (tokenRef.current) {
      releaseExternalPressOwnership(tokenRef.current, debugName);
    }
    tokenRef.current = claimExternalPressOwnership(debugName);
  }, [debugName, isEnabled]);
  const release = React.useCallback(() => {
    if (!tokenRef.current) return;
    releaseExternalPressOwnership(tokenRef.current, debugName);
    tokenRef.current = null;
  }, [debugName]);
  React.useEffect(() => release, [release]);
  return /* @__PURE__ */jsx(View, {
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
//# sourceMappingURL=PressBoundary.mjs.map
