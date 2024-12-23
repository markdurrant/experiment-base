import { Component } from "./components/Component";

const SimpleButton = new Component({
  name: "simple-button",
  state: {
    text: "My Simple Button",
    color: "red",
  },
  template: (state) => `<button>${state.text}</button>`,
  styleTemplate: (state) => `button { background-color: ${state.color}; }`,
});

const mySimpleButton1 = new SimpleButton();
const mySimpleButton2 = new SimpleButton();

document.body.appendChild(mySimpleButton1);
document.body.appendChild(mySimpleButton2);

mySimpleButton2.state.text = "Simple Two";

window.mySimpleButton2 = mySimpleButton2;
