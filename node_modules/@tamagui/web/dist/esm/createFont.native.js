var fontWeights = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
var processSection = function (section, keys, defaultValue) {
  if (typeof section === "string") return section;
  var sectionKeys = Object.keys(section);
  var fillValue = section[sectionKeys[0]];
  return Object.fromEntries([... /* @__PURE__ */new Set([...keys, ...sectionKeys])].map(function (key) {
    var _section_key, _ref;
    var value = (_ref = (_section_key = section[key]) !== null && _section_key !== void 0 ? _section_key : defaultValue) !== null && _ref !== void 0 ? _ref : fillValue;
    fillValue = value;
    defaultValue = value;
    return [key, value];
  }));
};
var createFont = function (font) {
  var sizeKeys = Object.keys(font.size || {});
  var processedFont = Object.fromEntries(Object.entries(font).map(function (param) {
    var [key, section] = param;
    return [key, processSection(section, key === "face" ? fontWeights : sizeKeys, key === "face" ? {
      normal: font.family
    } : void 0)];
  }));
  return Object.freeze(processedFont);
};
export { createFont };
//# sourceMappingURL=createFont.native.js.map
