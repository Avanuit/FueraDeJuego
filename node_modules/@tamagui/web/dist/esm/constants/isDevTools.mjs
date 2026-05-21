const isDevTools = (() => {
  if (process.env.NODE_ENV === "development") {
    try {
      return new Function("try {return this===window;}catch(e){ return false;}")();
    } catch {}
  }
  return false;
})();
export { isDevTools };
//# sourceMappingURL=isDevTools.mjs.map
