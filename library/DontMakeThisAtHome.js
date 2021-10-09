import DontMakeThisAtHomeComponent from "./DontMakeThisAtHomeComponent.js";

export default class DontMakeThisAtHome {
  static Component() {
    return DontMakeThisAtHomeComponent;
  }

  static components(...componentsClass) {
    componentsClass.forEach((componentClass) =>
      customElements.define(componentClass.component.name, componentClass)
    );
  }
}
