type Selector = string;

const _lItemMethods = {
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

const _lItemGetters = {
  classList: function () {
    return this.node.classList;
  },
};

const _lItemSetters = {
  classList: function (value: string) {
    this.node.classList.value = value;
  },
};

const _lItemFromNode = (node: Element) => {
  const _lItem = { node, ..._lItemMethods };

  Object.defineProperties(_lItem, {
    classList: {
      get: _lItemGetters.classList,
      set: _lItemSetters.classList,
      enumerable: true,
    },
  });

  return _lItem;
};

export const _l = (selector: Selector) => {
  const nodeList = document.querySelectorAll(selector);

  const _list = Array.from(nodeList).map((node) => {
    return _lItemFromNode(node);
  });

  return _list;
};
