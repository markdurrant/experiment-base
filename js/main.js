import { _j } from "./utils/DomHook";
import { getRootColors } from "./utils/stylingTools";

const dummyClasses = [
  "sml",
  "mid",
  "lrg",
  "red",
  "green",
  "blue",
  "cyan",
  "magenta",
  "yellow",
];

document.addEventListener("DOMContentLoaded", () => {
  const DOMGroups = dummyClasses.map((cls) => {
    return _j(`.${cls}`);
  });

  const rooty = getRootColors();

  window.DOMGroups = DOMGroups;
});
