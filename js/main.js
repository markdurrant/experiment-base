import { _l } from "./littleEl";

document.addEventListener("DOMContentLoaded", () => {
  const greenies = _l(".green");
  const ten = _l(".test-ten");
  const elevenses = _l(".eleven");

  const myLists = {
    greenies,
    ten,
    elevenses,
  };

  window.myLists = myLists;
});
