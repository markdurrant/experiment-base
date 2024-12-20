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

  // Add 'each' function
  // greenies.each((green, i) => {
  //   console.log({ green, i });
  // });

  // I want this to give me an array of all the `clientHeight`s
  // greenies.clientHeight

  // Ideally greenies is still an array

  window.myLists = myLists;
});
