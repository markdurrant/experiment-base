import encoderConfig from "./encoderConfig.js";
import inputConfig from "../config/inputConfig.js";
import settingsConfig from "../config/settingsConfig.js";
import util from "../utilities/utilities.js";
import store from "../store/store.js";
import actions from "../actions/actions.js";

let midi = {};

// Parse midi message
midi.parseMsg = (msg) => {
  // Normalize  midi message value
  let normalize = (v, min = 0, max = 127) => {
    return parseFloat(((v - min) / (max - min)).toFixed(3));
  };

  let parsedMsg = {};
  let data;

  if (typeof msg.data === "string") {
    data = msg.data.split(",");
    data.forEach((d, i) => {
      data[i] = Number(d);
    });
  } else {
    data = msg.data;
  }

  // Split into separate variables
  let a = data[0],
    b = data[1],
    c = data[2];

  // Check if input is encoder or button
  if (a >= 176 && a <= 182) {
    // Get config for encoder
    let configEntry = encoderConfig[b.toString()];

    parsedMsg.type = "encoder";
    parsedMsg.value = c;
    parsedMsg.track = a - 175;
    parsedMsg.name = configEntry.name;

    // Check if encoder config has a specified normalise min/max
    if (configEntry.normalize) {
      parsedMsg.normal = normalize(
        c,
        configEntry.normalize[0],
        configEntry.normalize[1]
      );
    } else {
      parsedMsg.normal = normalize(c, 0, 127);
    }
  } else if ((a >= 144 && a <= 149) || (a >= 128 && a <= 133)) {
    parsedMsg.type = "button";
    parsedMsg.value = b - 51;
    parsedMsg.name = "sequencer_" + parsedMsg.value;

    // Set normal for button up / button down
    if (a >= 144) {
      parsedMsg.track = a - 143;
      parsedMsg.normal = 1;
    } else {
      parsedMsg.track = a - 127;
      parsedMsg.normal = 0;
    }
  }

  return parsedMsg;
};

// On midi input parse message and update setting
midi.onInput = (msg) => {
  let parsedMsg = midi.parseMsg(msg);
  let track = `track_${parsedMsg.track}`;

  let updateSetting = (groupKey, inputSetting, parsedMsg) => {
    let mutation = util.groupKeyToMutation(groupKey, inputSetting.setting);
    let value;

    let normalToValue = (normal) => {
      let setting = settingsConfig[groupKey][inputSetting.setting];
      let value = normal * (setting.max - setting.min) + setting.min;

      if (setting.increment) {
        value = util.toNearestIncrement(value, setting.increment);
      }

      return value;
    };

    if (parsedMsg.type === "button" && parsedMsg.normal === 0) {
      return;
    }

    if (inputSetting.type === "range") {
      value = normalToValue(inputSetting.value(parsedMsg.normal));
    }

    if (inputSetting.type === "select") {
      value = inputSetting.value;
    }

    if (inputSetting.type === "toggle") {
      let options = settingsConfig[groupKey][inputSetting.setting].options;
      let current = store.state[groupKey][inputSetting.setting];
      let index = options.indexOf(current);

      if (index === options.length - 1) {
        index = -1;
      }

      value = options[index + 1];
    }

    store.commit(mutation, value);
  };

  if (inputConfig.global && inputConfig.global[parsedMsg.name]) {
    track = "global";
  }

  if (
    inputConfig[track] &&
    inputConfig[track][parsedMsg.name] &&
    inputConfig[track][parsedMsg.name].setting
  ) {
    updateSetting(track, inputConfig[track][parsedMsg.name], parsedMsg);
  } else if (
    inputConfig[track] &&
    inputConfig[track][parsedMsg.name] &&
    inputConfig[track][parsedMsg.name].action &&
    parsedMsg.normal > 0
  ) {
    console.log("ACTION!");
    actions[inputConfig[track][parsedMsg.name].action].fn();
  } else {
    console.log("No inputConfig found for control", parsedMsg);
  }
};

// Connet to midi device
midi.connect = () => {
  let midiConectFailed = () => {
    console.log("Failed to connect to MIDI device.");
  };

  let midiConected = (midiAccess) => {
    if (midiAccess.inputs.size === 0) {
      midiConectFailed();

      return;
    }

    console.log(
      `[${midiAccess.inputs.values().next().value.name}] MIDI device connected.`
    );

    // On midi input fire midi.input()
    for (let input of midiAccess.inputs.values()) {
      input.onmidimessage = midi.onInput;
    }
  };

  // Test for browser midi support, and connect to device if available
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(midiConected, midiConectFailed);
  } else {
    console.log("Midi through browser not supported");
  }
};

export default midi;
