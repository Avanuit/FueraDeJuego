import { pseudoDescriptors } from "./pseudoDescriptors.native.js";
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var mergeProps = function (defaultProps, props) {
  var out = {};
  for (var key in defaultProps) {
    if (key in props) continue;
    out[key] = defaultProps[key];
  }
  for (var key1 in props) {
    mergeProp(out, defaultProps, props, key1);
  }
  return out;
};
var mergeComponentProps = function (defaultProps, contextProps, props) {
  var overriddenContext = null;
  if (!defaultProps && !contextProps) {
    return [props, overriddenContext];
  }
  if (defaultProps && !contextProps) {
    return [mergeProps(defaultProps, props), overriddenContext];
  }
  var out = {};
  for (var key in defaultProps) {
    if (key in props) continue;
    out[key] = defaultProps[key];
  }
  for (var key1 in contextProps) {
    if (key1 in props) continue;
    var contextValue = contextProps[key1];
    if (contextValue !== void 0) {
      out[key1] = contextValue;
    }
  }
  for (var key2 in props) {
    mergeProp(out, defaultProps, props, key2);
    if (contextProps && key2 in contextProps) {
      overriddenContext || (overriddenContext = {});
      overriddenContext[key2] = props[key2];
    }
  }
  return [out, overriddenContext];
};
function mergeProp(out, defaultProps, props, key) {
  var val = props[key];
  if (defaultProps && key in defaultProps && (key in pseudoDescriptors || key[0] === "$") && val && (typeof val === "undefined" ? "undefined" : _type_of(val)) === "object") {
    var defaultVal = defaultProps[key];
    if (defaultVal && (typeof defaultVal === "undefined" ? "undefined" : _type_of(defaultVal)) === "object") {
      val = mergeProps(defaultVal, val);
    }
  }
  out[key] = val;
}
export { mergeComponentProps, mergeProps };
//# sourceMappingURL=mergeProps.native.js.map
