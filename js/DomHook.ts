import { HTML_ELEMENT_ALL_KEYS } from "./HTMLElementKeys";

type Selector = string;

const _jGroup = (nodeList) => {
  return nodeList.map((node) => _jItem(node));
};

const getPropConfig = function (prop, propTypes) {
  const get = propTypes.includes("get") && {
    get() {
      return this.node[prop];
    },
  };

  const set = propTypes.includes("get") && {
    set(value) {
      this.node[prop] = value;
    },
  };

  const method = propTypes.includes("method") && {
    value: function (...args) {
      return this.node[prop](...args);
    },
  };

  return {
    ...get,
    ...set,
    ...method,
    enumerable: true,
  };
};

const _jItem = (node) => {
  const _jitem = { node };

  for (const prop in HTML_ELEMENT_ALL_KEYS) {
    const propTypes = HTML_ELEMENT_ALL_KEYS[prop];
    const propConfig = getPropConfig(prop, propTypes);

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
