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
  const match = css.match(/^linear-gradient\((.+)\)$/s);
  if (!match) return void 0;
  const inner = match[1];
  const parts = splitOutsideParens(inner);
  if (parts.length < 2) return void 0;
  let direction;
  let startIdx = 0;
  const firstPart = parts[0].trim();
  if (firstPart.startsWith("to ") || /^\d+(\.\d+)?(deg|rad|turn|grad)$/.test(firstPart)) {
    direction = firstPart;
    startIdx = 1;
  }
  const colorStops = [];
  for (let i = startIdx; i < parts.length; i++) {
    const stopParts = parts[i].trim().match(/\S+\([^)]*\)|\S+/g);
    if (!stopParts) continue;
    const colorRaw = stopParts[0];
    const color = resolveColor(colorRaw, tokenMap);
    const positions = stopParts.slice(1);
    const stop = {
      color
    };
    if (positions.length > 0) {
      stop.positions = positions;
    }
    colorStops.push(stop);
  }
  const gradient = {
    type: "linear-gradient",
    colorStops
  };
  if (direction) {
    gradient.direction = direction;
  }
  return [gradient];
}
function parseBoxShadow(css, tokenMap) {
  const shadowStrings = splitOutsideParens(css);
  const shadows = [];
  for (const raw of shadowStrings) {
    const s = raw.trim();
    if (!s) continue;
    const tokens = s.split(/\s+/);
    if (tokens.length < 2) return void 0;
    let startIdx = 0;
    let inset = false;
    if (tokens[0] === "inset") {
      inset = true;
      startIdx = 1;
    }
    const numericParts = [];
    let colorParts = [];
    for (let i = startIdx; i < tokens.length; i++) {
      const n = parseDimension(tokens[i]);
      if (n !== void 0) {
        numericParts.push(n);
      } else {
        colorParts = tokens.slice(i);
        break;
      }
    }
    if (numericParts.length < 2) return void 0;
    const shadow = {
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
      const colorStr = colorParts.join(" ");
      shadow.color = resolveColor(colorStr, tokenMap);
    }
    shadows.push(shadow);
  }
  return shadows.length > 0 ? shadows : void 0;
}
function parseTextShadow(css, tokenMap) {
  const tokens = css.trim().split(/\s+/);
  if (tokens.length < 3) return void 0;
  const offsetX = parseDimension(tokens[0]);
  const offsetY = parseDimension(tokens[1]);
  const blur = parseDimension(tokens[2]);
  if (offsetX === void 0 || offsetY === void 0 || blur === void 0) {
    return void 0;
  }
  const result = [["textShadowOffset", {
    width: offsetX,
    height: offsetY
  }], ["textShadowRadius", blur]];
  if (tokens.length >= 4) {
    const colorStr = tokens.slice(3).join(" ");
    result.push(["textShadowColor", resolveColor(colorStr, tokenMap)]);
  }
  return result;
}
function parseDimension(s) {
  const cleaned = s.replace(/px$|dp$/, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : void 0;
}
function splitOutsideParens(s) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s.charCodeAt(i);
    if (ch === 40) depth++;else if (ch === 41) depth--;else if (ch === 44 && depth === 0) {
      parts.push(s.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(s.slice(start));
  return parts;
}
export { parseNativeStyle };
//# sourceMappingURL=parseNativeStyle.mjs.map
