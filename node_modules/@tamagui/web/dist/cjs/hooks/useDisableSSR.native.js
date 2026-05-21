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
var useDisableSSR_exports = {};
__export(useDisableSSR_exports, {
  getDisableSSR: () => getDisableSSR
});
module.exports = __toCommonJS(useDisableSSR_exports);
var import_config = require("../config.native.js");
function getDisableSSR(componentContext) {
  var _componentContext_disableSSR;
  return (_componentContext_disableSSR = componentContext === null || componentContext === void 0 ? void 0 : componentContext.disableSSR) !== null && _componentContext_disableSSR !== void 0 ? _componentContext_disableSSR : (0, import_config.getSetting)("disableSSR");
}
//# sourceMappingURL=useDisableSSR.native.js.map
