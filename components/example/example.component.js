import DontMakeThisAtHome from "../../library/DontMakeThisAtHome.js";

export default class ExempleComponent extends DontMakeThisAtHome.Component() {
  static component = {
    name: "example-component",
    template: true,
    style: true,
  };

  static get observedAttributes() {
    return ["text"];
  }

  onTextChange(val) {
    this.shadowRoot.getElementById("text").innerHTML = val;
  }
}
