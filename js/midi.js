class MidiDevice {
  constructor(index) {
    this.midiAccess;
    this.deviceName;
    this.onMessage;

    this.midiConectSucess = (midiAccess) => {
      if (midiAccess.inputs.size !== 0) {
        this.midiAccess = midiAccess;
        this.deviceName = midiAccess.inputs.values().next().value.name;
        this.listen(midiAccess);

        console.log(`MIDI device connected: ${this.deviceName}`);
      } else {
        this.midiConectFailed();
      }
    };

    this.midiConectFailed = () => {
      console.log("Failed to connect to MIDI device.");
    };

    if (navigator.requestMIDIAccess) {
      navigator
        .requestMIDIAccess()
        .then(this.midiConectSucess, this.midiConectFailed);
    } else {
      console.log("Midi through browser not supported");
    }
  }

  listen() {
    for (let input of this.midiAccess.inputs.values()) {
      input.onmidimessage = this.onMessage;
    }
  }

  send(data) {
    if (this.midiAccess) {
      for (let output of this.midiAccess.outputs.values()) {
        output.send(data);
      }
    } else {
      console.log("Midi device not connected");
    }
  }
}

export { MidiDevice as default };
