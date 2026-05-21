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
var ComponentContext_exports = {};
__export(ComponentContext_exports, {
  ComponentContext: () => ComponentContext,
  useConfiguration: () => useConfiguration
});
module.exports = __toCommonJS(ComponentContext_exports);
var import_react = require("react");
var import_createStyledContext = require("../helpers/createStyledContext.native.js");
var ComponentContext = (0, import_createStyledContext.createStyledContext)({
  disableSSR: void 0,
  inText: false,
  language: null,
  animationDriver: null,
  setParentFocusState: null,
  insets: null
});
var useConfiguration = function () {
  return (0, import_react.useContext)(ComponentContext);
};
//# sourceMappingURL=ComponentContext.native.js.map
