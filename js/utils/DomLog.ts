import { _j, _jFromTemplate } from "./DomHook";

const PRE_TEMPLATE = `<pre class="dom-log-display"></pre>`;

const valueTemplate = (value, meta) => `<span class="value-outer">
  <span class="value">${value}</span><span class="meta">${meta}</span>
</span>`;

const logPre = _jFromTemplate(PRE_TEMPLATE);

export class DomLog {
  parent = document.body;
  pre = _jFromTemplate(PRE_TEMPLATE);

  constructor({ parent = document.body }) {
    this.parent = parent;

    this.parent.appendChild(this.pre.node);
  }

  log(value) {}
}
