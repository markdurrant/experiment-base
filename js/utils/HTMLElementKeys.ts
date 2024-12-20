const HTML_ELEMENT_GETTERS = [
  "attributes",
  "children",
  "classList",
  "clientHeight",
  "clientLeft",
  "clientTop",
  "clientWidth",
  "contentEditable",
  "firstChild",
  "innerHTML",
  "innerText",
  "isContentEditable",
  "lastChild",
  "nextSibling",
  "nodeType",
  "offsetHeight",
  "offsetWidth",
  "offsetLeft",
  "offsetParent",
  "offsetTop",
  "outerHTML",
  "outerText",
  "parentNode",
  "parentElement",
  "previousSibling",
  "previousElementSibling",
  "scrollHeight",
  "scrollLeft",
  "scrollTop",
  "scrollWidth",
  "style",
  "textContent",
];

const HTML_ELEMENT_SETTERS = [
  "contentEditable",
  "innerHTML",
  "innerText",
  "outerHTML",
  "outerText",
  "scrollLeft",
  "scrollTop",
  "setAttribute",
  "setAttributeNode",
  "style",
  "textContent",
];

const HTML_ELEMENT_METHODS = [
  "addEventListener",
  "appendChild",
  "blur",
  "click",
  "cloneNode",
  "closest",
  "contains",
  "focus",
  "getAttribute",
  "getBoundingClientRect",
  "hasChildNodes",
  "insertBefore",
  "querySelector",
  "querySelectorAll",
  "remove",
  "removeAttribute",
  "removeChild",
  "removeEventListener",
  "replaceChild",
  "scrollIntoView",
  "setAttribute",
  "setAttributeNode",
  "toString",
];

export const HTML_ELEMENT_ALL_KEYS = [
  ...HTML_ELEMENT_GETTERS,
  ...HTML_ELEMENT_SETTERS,
  ...HTML_ELEMENT_METHODS,
].reduce((acc, key) => {
  const propTypes: string[] = [];

  if (HTML_ELEMENT_GETTERS.includes(key)) propTypes.push("get");
  if (HTML_ELEMENT_SETTERS.includes(key)) propTypes.push("set");
  if (HTML_ELEMENT_METHODS.includes(key)) propTypes.push("method");

  acc[key] = propTypes;

  return acc;
}, {});
