import { HTML_ELEMENT_ALL_KEYS } from "./HTMLElementKeys";

type Selector = string;

const _jGroup = (nodeList) => {
  return nodeList.map((node) => _jItem(node));
};

const _jItem = (node) => {
  const _jitem = { node };

  for (const prop in HTML_ELEMENT_ALL_KEYS) {
    const propTypes = HTML_ELEMENT_ALL_KEYS[prop];

    const hasGet = propTypes.includes("get");
    const hasSet = propTypes.includes("set");
    const hasMethod = propTypes.includes("method");

    _jitem[prop] = {};

    const propConfig = {};

    if (hasGet) {
      propConfig.get = function () {
        return this.node[prop];
      };
    }

    if (hasSet) {
      propConfig.set = function (value) {
        this.node[prop] = value;
      };
    }

    if (hasMethod) {
      _jitem[prop] = function (...args) {
        this.node[prop](...args);
      };
    }

    Object.defineProperty(_jitem, prop, propConfig);
  }

  return _jitem;
};

export const _j = (selector: Selector) => {
  const nodeList = Array.from(document.querySelectorAll(selector));
  const listLength = nodeList.length;

  if (listLength === 0) return null;
  if (listLength === 1) return _jItem(nodeList[0]);
  if (listLength > 1) return _jGroup(nodeList);
};
