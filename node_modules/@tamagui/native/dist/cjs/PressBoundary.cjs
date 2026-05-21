var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
// If the importer is in node compatibility mode or this is not an ESM
// file that has been converted to a CommonJS file using a Babel-
// compatible transform (i.e. "__esModule" has not been set), then set
// "default" to the CommonJS "module.exports" for node compatibility.
isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var PressBoundary_exports = {};
__export(PressBoundary_exports, {
  PressBoundary: () => PressBoundary
});
module.exports = __toCommonJS(PressBoundary_exports);
var import_react = __toESM(require("react"), 1);
var import_react_native = require("react-native-web");
var import_gestureState = require("./gestureState.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
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
const PressBoundary = import_react.default.forwardRef(function PressBoundary2({
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
  const tokenRef = import_react.default.useRef(null);
  const isEnabled = enabled ?? stopPropagation ?? true;
  const claim = import_react.default.useCallback(() => {
    if (!isEnabled) return;
    if (tokenRef.current) {
      (0, import_gestureState.releaseExternalPressOwnership)(tokenRef.current, debugName);
    }
    tokenRef.current = (0, import_gestureState.claimExternalPressOwnership)(debugName);
  }, [debugName, isEnabled]);
  const release = import_react.default.useCallback(() => {
    if (!tokenRef.current) return;
    (0, import_gestureState.releaseExternalPressOwnership)(tokenRef.current, debugName);
    tokenRef.current = null;
  }, [debugName]);
  import_react.default.useEffect(() => release, [release]);
  return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_native.View, {
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