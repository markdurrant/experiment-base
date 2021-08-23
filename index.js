const HID = require("node-hid");
const devices = HID.devices();

const deviceInfo = devices.find((device) => {
  return device.product === "Intech Studio: Grid";
});

let EN16 = new HID.HID(deviceInfo.vendorId, deviceInfo.productId);

console.log(EN16);
