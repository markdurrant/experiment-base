import { HTML_ELEMENT_GETTER_KEYS, HTML_ELEMENT_SETTER_KEYS } from "./consts";

type Selector = string;

const _lItemMethods = {
  toggleClass: function (className: string) {
    this.element.classList.toggle(className);
  },
  addClass: function (className: string) {
    this.element.classList.add(className);
  },
  removeClass: function (className: string) {
    this.element.classList.remove(className);
  },
  on: function (event: Event, fn: Function) {
    this.element.addEventListener(event, fn);
  },
  off: function (event: Event, fn: Function) {
    this.element.removeEventListener(event, fn);
  },
  onClick: function (fn: Function) {
    this.on("click", fn);
  },
  onInput: function (fn: Function) {
    this.on("input", fn);
  },
};

const allKeys = new Set([
  ...HTML_ELEMENT_GETTER_KEYS,
  ...HTML_ELEMENT_SETTER_KEYS,
]);

const _lItemElementProps = Array.from(allKeys).reduce((acc, key) => {
  const hasGet = HTML_ELEMENT_GETTER_KEYS.includes(key);
  const hasSet = HTML_ELEMENT_SETTER_KEYS.includes(key);

  acc[key] = { enumerable: true };

  if (hasGet)
    acc[key].get = function () {
      return this.element[key];
    };

  if (hasSet)
    acc[key].set = function (value) {
      this.element[key] = value;
    };

  return acc;
}, {});

const _lItemFromElement = (element: Element) => {
  const _lItem = { element, ..._lItemMethods };

  Object.defineProperties(_lItem, _lItemElementProps);

  return _lItem;
};

export const _l = (selector: Selector) => {
  const nodeList = document.querySelectorAll(selector);

  if (nodeList.length === 1) return _lItemFromElement(nodeList[0]);

  const _list = Array.from(nodeList).map((element) => {
    return _lItemFromElement(element);
  });

  return _list;
};
