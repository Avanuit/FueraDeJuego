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
var createFont_exports = {};
__export(createFont_exports, {
  createFont: () => createFont
});
module.exports = __toCommonJS(createFont_exports);
const fontWeights = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
const processSection = (section, keys, defaultValue) => {
  if (typeof section === "string") return section;
  const sectionKeys = Object.keys(section);
  let fillValue = section[sectionKeys[0]];
  return Object.fromEntries([... /* @__PURE__ */new Set([...keys, ...sectionKeys])].map(key => {
    const value = section[key] ?? defaultValue ?? fillValue;
    fillValue = value;
    defaultValue = value;
    return [key, value];
  }));
};
const createFont = font => {
  const sizeKeys = Object.keys(font.size || {});
  const processedFont = Object.fromEntries(Object.entries(font).map(([key, section]) => {
    return [key, processSection(section, key === "face" ? fontWeights : sizeKeys, key === "face" ? {
      normal: font.family
    } : void 0)];
  }));
  return Object.freeze(processedFont);
};