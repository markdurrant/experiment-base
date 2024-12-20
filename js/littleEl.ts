type Selector = string;

// Quality of life improvemetns
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

// Make a 'Proxy' for the element.
// We can add new methods with `_lItemMethods`
// Any prop not part of `_lItemMethods` will be passed on to the element
const _lItem = (element: Node) => {
  const handler = {
    get(target, prop) {
      if (prop in target) {
        return target[prop]; // Return the property from the primary object if it exists
      }

      if (prop in element) {
        return element[prop]; // Fallback to the other object
      }

      return element;
    },
  };

  return new Proxy(_lItemMethods, handler);
};

// Crrate alist of `_lItems`
export const _lList = (nodeList: NodeList) => {
  const _list = Array.from(nodeList).map((element) => {
    return _lItem(element);
  });

  return _list;
};

// Get all elements for a selector and transform into 'Proxys'
export const _l = (selector: Selector) => {
  const nodeList = document.querySelectorAll(selector);

  // No matches
  if (nodeList.length === 0) return null;
  // single match, single `_lItem` returned
  if (nodeList.length === 1) return _lItem(nodeList[0]);
  // More than one match, return `_lList`
  if (nodeList.length > 1) return _lList(nodeList);
};
