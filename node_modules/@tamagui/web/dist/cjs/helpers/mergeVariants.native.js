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
var mergeVariants_exports = {};
__export(mergeVariants_exports, {
  mergeVariants: () => mergeVariants
});
module.exports = __toCommonJS(mergeVariants_exports);
var mergeVariants = function (parentVariants, ourVariants) {
  var level = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  var variants = {};
  for (var key in ourVariants) {
    var parentVariant = parentVariants === null || parentVariants === void 0 ? void 0 : parentVariants[key];
    var ourVariant = ourVariants[key];
    if (!parentVariant || typeof ourVariant === "function") {
      variants[key] = ourVariant;
    } else if (parentVariant && !ourVariant) {
      variants[key] = parentVariant[key];
    } else {
      if (level === 0) {
        variants[key] = mergeVariants(parentVariant, ourVariant, level + 1);
      } else {
        variants[key] = {
          ...parentVariant,
          ...ourVariant
        };
      }
    }
  }
  return {
    ...parentVariants,
    ...variants
  };
};
//# sourceMappingURL=mergeVariants.native.js.map
