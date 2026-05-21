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
var getDynamicVal_exports = {};
__export(getDynamicVal_exports, {
  extractValueFromDynamic: () => extractValueFromDynamic,
  getDynamicVal: () => getDynamicVal,
  getOppositeScheme: () => getOppositeScheme,
  isColorStyleKey: () => isColorStyleKey
});
module.exports = __toCommonJS(getDynamicVal_exports);
function getOppositeScheme(scheme) {
  return scheme === "dark" ? "light" : "dark";
}
const colorStyleKeys = {
  backgroundColor: true,
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderBottomColor: true,
  borderLeftColor: true,
  borderBlockColor: true,
  borderBlockEndColor: true,
  borderBlockStartColor: true,
  color: true,
  shadowColor: true,
  textDecorationColor: true,
  textShadowColor: true,
  tintColor: true,
  outlineColor: true
};
function isColorStyleKey(key) {
  return colorStyleKeys[key] === true;
}
function getDynamicVal({
  scheme,
  val,
  oppositeVal
}) {
  const oppositeScheme = getOppositeScheme(scheme);
  return {
    dynamic: {
      [scheme]: val,
      [oppositeScheme]: oppositeVal
    }
  };
}
function extractValueFromDynamic(val, scheme) {
  if (val?.["dynamic"]) {
    return val["dynamic"][scheme];
  }
  return val;
}