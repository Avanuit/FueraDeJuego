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
var mergeProps_exports = {};
__export(mergeProps_exports, {
  mergeComponentProps: () => mergeComponentProps,
  mergeProps: () => mergeProps
});
module.exports = __toCommonJS(mergeProps_exports);
var import_pseudoDescriptors = require("./pseudoDescriptors.cjs");
const mergeProps = (defaultProps, props) => {
  const out = {};
  for (const key in defaultProps) {
    if (key in props) continue;
    out[key] = defaultProps[key];
  }
  for (const key in props) {
    mergeProp(out, defaultProps, props, key);
  }
  return out;
};
const mergeComponentProps = (defaultProps, contextProps, props) => {
  let overriddenContext = null;
  if (!defaultProps && !contextProps) {
    return [props, overriddenContext];
  }
  if (defaultProps && !contextProps) {
    return [mergeProps(defaultProps, props), overriddenContext];
  }
  const out = {};
  for (const key in defaultProps) {
    if (key in props) continue;
    out[key] = defaultProps[key];
  }
  for (const key in contextProps) {
    if (key in props) continue;
    const contextValue = contextProps[key];
    if (contextValue !== void 0) {
      out[key] = contextValue;
    }
  }
  for (const key in props) {
    mergeProp(out, defaultProps, props, key);
    if (contextProps && key in contextProps) {
      overriddenContext ||= {};
      overriddenContext[key] = props[key];
    }
  }
  return [out, overriddenContext];
};
function mergeProp(out, defaultProps, props, key) {
  let val = props[key];
  if (defaultProps && key in defaultProps && (key in import_pseudoDescriptors.pseudoDescriptors || key[0] === "$") && val && typeof val === "object") {
    const defaultVal = defaultProps[key];
    if (defaultVal && typeof defaultVal === "object") {
      val = mergeProps(defaultVal, val);
    }
  }
  out[key] = val;
}