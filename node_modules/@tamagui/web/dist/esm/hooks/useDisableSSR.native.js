import { getSetting } from "../config.native.js";
function getDisableSSR(componentContext) {
  var _componentContext_disableSSR;
  return (_componentContext_disableSSR = componentContext === null || componentContext === void 0 ? void 0 : componentContext.disableSSR) !== null && _componentContext_disableSSR !== void 0 ? _componentContext_disableSSR : getSetting("disableSSR");
}
export { getDisableSSR };
//# sourceMappingURL=useDisableSSR.native.js.map
