import { _j } from "./DomHook";

let gridOverlay;

export const toggleGridOverlay = () => {
  if (!gridOverlay) {
    gridOverlay = _j(".grid-overlay");
  }

  gridOverlay.toggleClass("active");
};

window.toggleGridOverlay = toggleGridOverlay;

// Take And array of rgb values and convert to hex
function rgbToHex(rgbArray) {
  const hex = rgbArray
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");

  return "#" + hex;
}

// Add color string to a temp <div>, measure the color, and destoryt the div.
export const parseCssColor = (cssColorStr) => {
  const tmpDiv = document.createElement("div");

  document.body.appendChild(tmpDiv);

  tmpDiv.style.color = cssColorStr;

  const rgb = getComputedStyle(tmpDiv).color.match(/[\d]+/g).map(Number);

  tmpDiv.remove();

  return rgbToHex(rgb);
};

// Formats CSS custom prop string to be suitable as a JS key
export const customPropToJS = (cssPropStr) => {
  const allStyles = getComputedStyle(document.documentElement);
  const propValue = allStyles.getPropertyValue(cssPropStr).trim();

  const jsKey = cssPropStr
    .replace(/^--/, "")
    .replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase()); // Convert kebab-case to camelCase

  return {
    cssPropStr,
    jsKey,
    value: propValue,
  };
};

// Filter out any rules that aren't about color
const onlyColors = (rootRules) => {
  const testStrs = [
    "Color",
    "color",
    "#",
    "rgb",
    "hsl",
    "hwb",
    "lch",
    "oklch",
    "lab",
    "oklab",
  ];

  return rootRules.filter((rule) => {
    const keyValue = rule.jsKey + rule.value;

    return testStrs.some((str) => {
      return keyValue.includes(str);
    });
  });
};

// Get all the CSS custom colors defined in `_root.css`
// TODO: It can't handle `color-mix`
export const getRootColors = () => {
  const allstyleSheets = [...document.styleSheets];

  // Only look for the :root styles
  const rootRules = allstyleSheets
    .reduce((acc, sheet) => acc.concat(...sheet.cssRules), [])
    .filter((rule) => {
      return rule.selectorText === ":root";
    })[0].style;

  const allCustomProps = Array.from(rootRules).filter((prop) =>
    prop.startsWith("--")
  );

  const withValues = allCustomProps.map((prop) => {
    return customPropToJS(prop);
  });

  const rootColors = onlyColors(withValues);

  return rootColors.map((rule) => {
    rule.value = parseCssColor(rule.value);

    return rule;
  });
};
