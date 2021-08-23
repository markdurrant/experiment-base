const midi = {};

// Fire on each midi message
midi.onMessage = (input) => {
  document.querySelector("pre").textContent = input.data;
};

// Connet to midi device
midi.connect = () => {
  const midiConectFailed = () => {
    console.log("Failed to connect to MIDI device.");
  };

  const midiConected = (midiAccess) => {
    if (midiAccess.inputs.size === 0) {
      midiConectFailed();

      return;
    }

    console.log(
      `[${midiAccess.inputs.values().next().value.name}] MIDI device connected.`
    );

    for (let input of midiAccess.inputs.values()) {
      input.onmidimessage = midi.onMessage;
    }
  };

  // Test for browser midi support, and connect to device if available
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(midiConected, midiConectFailed);
  } else {
    console.log("Midi through browser not supported");
  }
};

export { midi as default };
