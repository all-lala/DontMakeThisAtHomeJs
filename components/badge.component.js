import DontMakeThisAtHome from "../library/DontMakeThisAtHome.js";

export default class BadgeComponent extends DontMakeThisAtHome.Component() {
  static component = {
    name: "badge-component",
    template: true,
    style: true,
  };
}
