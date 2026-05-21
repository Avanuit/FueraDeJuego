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
export { mergeVariants };
//# sourceMappingURL=mergeVariants.native.js.map
