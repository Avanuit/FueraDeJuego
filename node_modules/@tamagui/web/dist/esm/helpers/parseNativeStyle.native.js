function parseNativeStyle(key, cssString, tokenMap) {
  switch (key) {
    case "backgroundImage":
      return parseBackgroundImage(cssString, tokenMap);
    case "boxShadow":
      return parseBoxShadow(cssString, tokenMap);
    case "textShadow":
      return parseTextShadow(cssString, tokenMap);
    default:
      return void 0;
  }
}
function resolveColor(raw, tokenMap) {
  if (tokenMap && tokenMap.has(raw)) {
    return tokenMap.get(raw);
  }
  return raw;
}
function parseBackgroundImage(css, tokenMap) {
  var match = css.match(RegExp("^linear-gradient\\((.+)\\)$", "s"));
  if (!match) return void 0;
  var inner = match[1];
  var parts = splitOutsideParens(inner);
  if (parts.length < 2) return void 0;
  var direction;
  var startIdx = 0;
  var firstPart = parts[0].trim();
  if (firstPart.startsWith("to ") || /^\d+(\.\d+)?(deg|rad|turn|grad)$/.test(firstPart)) {
    direction = firstPart;
    startIdx = 1;
  }
  var colorStops = [];
  for (var i = startIdx; i < parts.length; i++) {
    var stopParts = parts[i].trim().match(/\S+\([^)]*\)|\S+/g);
    if (!stopParts) continue;
    var colorRaw = stopParts[0];
    var color = resolveColor(colorRaw, tokenMap);
    var positions = stopParts.slice(1);
    var stop = {
      color
    };
    if (positions.length > 0) {
      stop.positions = positions;
    }
    colorStops.push(stop);
  }
  var gradient = {
    type: "linear-gradient",
    colorStops
  };
  if (direction) {
    gradient.direction = direction;
  }
  return [gradient];
}
function parseBoxShadow(css, tokenMap) {
  var shadowStrings = splitOutsideParens(css);
  var shadows = [];
  var _iteratorNormalCompletion = true,
    _didIteratorError = false,
    _iteratorError = void 0;
  try {
    for (var _iterator = shadowStrings[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var raw = _step.value;
      var s = raw.trim();
      if (!s) continue;
      var tokens = s.split(/\s+/);
      if (tokens.length < 2) return void 0;
      var startIdx = 0;
      var inset = false;
      if (tokens[0] === "inset") {
        inset = true;
        startIdx = 1;
      }
      var numericParts = [];
      var colorParts = [];
      for (var i = startIdx; i < tokens.length; i++) {
        var n = parseDimension(tokens[i]);
        if (n !== void 0) {
          numericParts.push(n);
        } else {
          colorParts = tokens.slice(i);
          break;
        }
      }
      if (numericParts.length < 2) return void 0;
      var shadow = {
        offsetX: numericParts[0],
        offsetY: numericParts[1]
      };
      if (inset) {
        shadow.inset = true;
      }
      if (numericParts.length >= 3) {
        shadow.blurRadius = numericParts[2];
      }
      if (numericParts.length >= 4) {
        shadow.spreadDistance = numericParts[3];
      }
      if (colorParts.length > 0) {
        var colorStr = colorParts.join(" ");
        shadow.color = resolveColor(colorStr, tokenMap);
      }
      shadows.push(shadow);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return shadows.length > 0 ? shadows : void 0;
}
function parseTextShadow(css, tokenMap) {
  var tokens = css.trim().split(/\s+/);
  if (tokens.length < 3) return void 0;
  var offsetX = parseDimension(tokens[0]);
  var offsetY = parseDimension(tokens[1]);
  var blur = parseDimension(tokens[2]);
  if (offsetX === void 0 || offsetY === void 0 || blur === void 0) {
    return void 0;
  }
  var result = [["textShadowOffset", {
    width: offsetX,
    height: offsetY
  }], ["textShadowRadius", blur]];
  if (tokens.length >= 4) {
    var colorStr = tokens.slice(3).join(" ");
    result.push(["textShadowColor", resolveColor(colorStr, tokenMap)]);
  }
  return result;
}
function parseDimension(s) {
  var cleaned = s.replace(/px$|dp$/, "");
  var n = Number(cleaned);
  return Number.isFinite(n) ? n : void 0;
}
function splitOutsideParens(s) {
  var parts = [];
  var depth = 0;
  var start = 0;
  for (var i = 0; i < s.length; i++) {
    var ch = s.charCodeAt(i);
    if (ch === 40) depth++;else if (ch === 41) depth--;else if (ch === 44 && /* , */
    depth === 0) {
      parts.push(s.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(s.slice(start));
  return parts;
}
export { parseNativeStyle };
//# sourceMappingURL=parseNativeStyle.native.js.map
