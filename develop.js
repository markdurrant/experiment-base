const fs = require("fs");
const sass = require("sass");
const nunjucks = require("nunjucks");

const config = JSON.parse(fs.readFileSync("./projectConfig.json"));

const input = {
  styles: "./src/sass/styles.scss",
  markup: "./src/index.njk",
};

const output = {
  styles: "./dist/css/styles.css",
  markup: "./dist/index.html",
};

const timeNow = () => {
  const now = new Date();

  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

const compileSass = () => {
  const cssDir = output.styles.split(".css")[0];

  let css;

  try {
    css = sass.compile(input.styles).css;
  } catch (error) {
    console.error("Sass error:");
    console.error(error.message);

    return;
  }

  fs.mkdirSync(cssDir, { recursive: true });
  fs.writeFileSync(output.styles, css);

  console.log(`Compiled ${input.styles} @ ${timeNow()}`);
};

const compileNunjucks = () => {
  let html;

  try {
    html = nunjucks.render(input.markup, config);
  } catch (error) {
    console.error("Nunjucks error:");
    console.log(error.message);

    return;
  }

  fs.writeFileSync(output.markup, html);
};

const args = process.argv.slice(2);

if (args.includes("--sass")) compileSass();
if (args.includes("--nunjucks")) compileNunjucks();
