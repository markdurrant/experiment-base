import { HTML_ELEMENT_ALL_KEYS } from "./HTMLElementKeys";

type Selector = string;

// Quality of life methods that get a lot of use
const extraMethods = {
  toggleClass: function (className: string) {
    this.node.classList.toggle(className);
  },
  addClass: function (className: string) {
    this.node.classList.add(className);
  },
  removeClass: function (className: string) {
    this.node.classList.remove(className);
  },
  on: function (event: Event, fn: Function) {
    this.node.addEventListener(event, fn);
  },
  off: function (event: Event, fn: Function) {
    this.node.removeEventListener(event, fn);
  },
  onClick: function (fn: Function) {
    this.on("click", fn);
  },
  onInput: function (fn: Function) {
    this.on("input", fn);
  },
};

// Group of _jitems
const _jGroup = (nodeList) => {
  const items = nodeList.map((node) => _jItem(node));

  const _jgroup = {
    items,
    each: function (fn) {
      items.map(fn);
    },
    getEachByProp: function (prop) {
      return this.items.map((item) => {
        return item[prop];
      });
    },
    setEachByProp: function (prop, value) {
      this.items.map((item) => {
        item[prop] = value;
      });
    },
  };

  return _jgroup;
};

// Get the config to define the _jItem getters, setters, and methods
// Use `propTypes` to know
const getPropConfig = function (prop, propTypes) {
  const get = {
    get() {
      return this.node[prop];
    },
  };

  const set = {
    set(value) {
      this.node[prop] = value;
    },
  };

  const method = {
    value: function (...args) {
      return this.node[prop](...args);
    },
  };

  return {
    ...(propTypes.includes("get") && get),
    ...(propTypes.includes("get") && set),
    ...(propTypes.includes("method") && method),
    enumerable: true,
  };
};

// Single DomHook item based on a node
const _jItem = (node) => {
  const _jitem = { node, ...extraMethods };

  // For each prop in HTML KEYS create a prop config and apply or _jItem;
  for (const prop in HTML_ELEMENT_ALL_KEYS) {
    const propTypes = HTML_ELEMENT_ALL_KEYS[prop];
    const propConfig = getPropConfig(prop, propTypes);

    Object.defineProperty(_jitem, prop, propConfig);
  }

  return _jitem;
};

// Get a nodelist from selector
// Depending on depth create `_jItem` or `jGroup`
export const _j = (selector: Selector) => {
  const nodeList = Array.from(document.querySelectorAll(selector));
  const listLength = nodeList.length;

  if (listLength === 0) return null;
  if (listLength === 1) return _jItem(nodeList[0]);
  if (listLength > 1) return _jGroup(nodeList);
};
