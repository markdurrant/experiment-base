import midi from "./midi.js";

midi.connect();

document.addEventListener("keydown", (e) => {
  console.log(e);
});

window.midi = midi;
