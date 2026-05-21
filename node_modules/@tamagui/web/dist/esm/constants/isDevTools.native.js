var isDevTools = function () {
  if (process.env.NODE_ENV === "development") {
    try {
      return new Function("try {return this===window;}catch(e){ return false;}")();
    } catch (e) {}
  }
  return false;
}();
export { isDevTools };
//# sourceMappingURL=isDevTools.native.js.map
