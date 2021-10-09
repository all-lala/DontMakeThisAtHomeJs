export default class DontMakeThisAtHomeComponent extends HTMLElement {
  static component = {
    name: "",
    template: false,
    style: false,
  };

  #path = "";

  static FILE_TYPE = {
    template: "template",
    style: "style",
  };

  customData = [];

  componentIsFullyLoaded = false;
  waitingCallbacks = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.customData[DontMakeThisAtHomeComponent.FILE_TYPE.template] = null;
    this.customData[DontMakeThisAtHomeComponent.FILE_TYPE.style] = null;

    this.#path = this.#getFilePath();

    if (this.constructor.component.template) {
      this.#getHtml();
    } else {
      const htmlIsLoaded = true;
    }
    if (this.constructor.component.style) {
      this.#getCss();
    }
  }

  /**
   * Get the file path
   * @returns
   */
  #getFilePath() {
    function getErrorObject() {
      try {
        throw Error("");
      } catch (err) {
        return err;
      }
    }

    var err = getErrorObject();
    return err.stack
      .split("\n")
      .filter((line) => line.match(this.constructor.name))[0]
      .match(/(http.*\.js):[0-9:]+/)[1];
  }

  /**
   * Get HTML template
   */
  #getHtml() {
    const htmlFileName = this.#path.replace(/\.[a-z]+$/i, ".html");
    return this.#loadFile(
      htmlFileName,
      DontMakeThisAtHomeComponent.FILE_TYPE.template
    );
  }

  /**
   * Get Css template
   */
  async #getCss() {
    const cssFileName = this.#path.replace(/\.[a-z]+$/i, ".css");
    return this.#loadFile(
      cssFileName,
      DontMakeThisAtHomeComponent.FILE_TYPE.style
    );
  }

  /**
   * Load file HTML/CSS from url
   * @param {string} url
   * @param {DontMakeThisAtHomeComponent.FILE_TYPE} type
   * @returns
   */
  async #loadFile(url, type) {
    return await fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data) {
          this.customData[type] = document.createElement(type);
          this.customData[type].innerHTML = data;
          this.shadowRoot.appendChild(
            type === DontMakeThisAtHomeComponent.FILE_TYPE.template
              ? this.customData[type].content
              : this.customData[type]
          );
          this.componentIsFullyLoaded = true;
          this.reloadCallBackAfterHtmlFullyLoaded();
        }
      });
  }

  /**
   * Roload component callback when HTML is fully loaded
   */
  reloadCallBackAfterHtmlFullyLoaded() {
    while (this.waitingCallbacks.length) {
      const cb = this.waitingCallbacks.shift();
      this.attributeChangedCallback(cb.name, cb.oldValue, cb.newValue);
    }
  }

  /**
   * Observe attribute change
   * @param {string} name
   * @param {any} oldValue
   * @param {any} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.componentIsFullyLoaded) {
      this.waitingCallbacks.push({ name, oldValue, newValue });
    } else {
      const methodName = `on${this.toPascalCase(name)}Change`;
      if (this[methodName]) {
        this[methodName](newValue, oldValue);
      }
    }
  }

  /**
   * String to upper case
   * @param {string} val
   * @returns
   */
  toPascalCase(val) {
    return val
      .replace(val[0], val[0].toUpperCase())
      .replace(/[^a-z]([a-z])/gi, (char) =>
        char[char.length - 1].toUpperCase()
      );
  }
}
