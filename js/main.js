import MidiDevice from "./midi.js";

const device = new MidiDevice();

device.onMessage = (msg) => {
  document.querySelector("pre").textContent = msg.data;
  document
    .querySelector(".status-dot")
    .animate([{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], {
      duration: 750,
    });
};

device.onConnection = (name) => {
  document.querySelector(
    "small"
  ).innerHTML = `Connected device: <b>${name}</b>`;
};

device.connect();

window.device = device;
