const mergeVariants = (parentVariants, ourVariants, level = 0) => {
  const variants = {};
  for (const key in ourVariants) {
    const parentVariant = parentVariants?.[key];
    const ourVariant = ourVariants[key];
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
//# sourceMappingURL=mergeVariants.mjs.map
