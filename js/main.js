import { _j } from "./utils/DomHook";

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

  window.DOMGroups = DOMGroups;
});
