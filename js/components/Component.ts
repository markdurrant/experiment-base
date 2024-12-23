// Create a DOMParser to parse templates
const domParser = new DOMParser();

const getStateProxy = (state, component) => {
  const handler = {
    set(target, prop, value) {
      target[prop] = value;

      component.render();

      return Reflect.set(...arguments);
    },
  };

  return new Proxy(state, handler);
};

export class Component {
  component;

  constructor({ name, state, template, styleTemplate }) {
    this.component = class extends HTMLElement {
      name;
      state;
      template;
      styleTemplate;

      constructor() {
        super();

        this.name = name;
        this.state = getStateProxy(state, this);
        this.template = template;
        this.styleTemplate = styleTemplate;

        this.attachShadow({ mode: "open" });

        this.render();
      }

      // Get the components HTML by suppling state to template
      get #element(): HTMLElement {
        const templateStr = this.template(this.state);
        const elementDoc = domParser.parseFromString(templateStr, "text/html");
        const element = elementDoc.body.firstChild;

        if (!(element instanceof HTMLElement)) {
          throw new Error("Template did not produce a valid HTMLElement");
        }

        return element;
      }

      get #style(): HTMLElement {
        const element = document.createElement("style");

        element.innerHTML = this.styleTemplate(this.state);

        return element;
      }

      // 'Render' component by completely replacing DOM
      render() {
        if (this.shadowRoot?.firstChild) {
          this.shadowRoot?.firstChild?.replaceWith(this.#style);
          this.shadowRoot?.lastChild?.replaceWith(this.#element);
        } else {
          this.shadowRoot?.appendChild(this.#style);
          this.shadowRoot?.appendChild(this.#element);
        }
      }
    };

    // Register custom element
    customElements.define(name, this.component);

    // Return component class
    return this.component;
  }
}
