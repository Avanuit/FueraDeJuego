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
export { extractValueFromDynamic, getDynamicVal, getOppositeScheme, isColorStyleKey };
//# sourceMappingURL=getDynamicVal.mjs.map
