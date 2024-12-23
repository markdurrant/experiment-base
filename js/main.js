import { _j } from "./utils/DomHook";
import { DomLog } from "./utils/DomLog";

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

  const logThis = new DomLog({});

  logThis.log({ a: "hello" });

  window.DOMGroups = DOMGroups;
});
