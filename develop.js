const fs = require("fs");
const path = require("path");

const sass = require("sass");
const nunjucks = require("nunjucks");

const config = JSON.parse(fs.readFileSync("./projectConfig.json"));

const input = {
  styles: "./src/sass/styles.scss",
  markup: "./src/index.njk",
  js: "./src/js/",
  assets: "./src/assets/",
};

const output = {
  styles: "./dist/css/styles.css",
  markup: "./dist/index.html",
  js: "./dist/js/",
  assets: "./dist/assets/",
};

const createDist = () => {
  if (!fs.existsSync("./dist/")) fs.mkdirSync("./dist/");
};

const copyRecursiveSync = (src, dest) => {
  const isDirectory = (() => {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);

    return exists && stats.isDirectory();
  })();

  if (isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach((item) => {
      if (item === ".gitkeep") return;

      const rSrc = path.join(src, item);
      const rDest = path.join(dest, item);

      copyRecursiveSync(rSrc, rDest);
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

const timeNow = () => {
  const now = new Date();

  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

const compileSass = () => {
  createDist();

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
  createDist();

  let html;

  try {
    html = nunjucks.render(input.markup, config);
  } catch (error) {
    console.error("Nunjucks error:");
    console.log(error.message);

    return;
  }

  fs.writeFileSync(output.markup, html);

  console.log(`Compiled ${input.markup} @ ${timeNow()}`);
};

const copyJs = () => {
  createDist();

  fs.rmSync(output.js, { recursive: true, force: true });

  copyRecursiveSync(input.js, output.js);

  console.log(`Copied ${input.js} @ ${timeNow()}`);
};

const copyAssets = () => {
  createDist();

  fs.rmSync(output.assets, { recursive: true, force: true });

  copyRecursiveSync(input.assets, output.assets);

  console.log(`Copied ${input.assets} @ ${timeNow()}`);
};

const build = () => {
  compileSass();
  compileNunjucks();
  copyJs();
  copyAssets();
};

const watch = () => {
  fs.watch("./src/", { recursive: true }, (event, file) => {
    const root = file.split("/")[0];
    const ext = file.split(".")[file.split(".").length - 1];

    if (root === "sass" || ext === "scss") compileSass();
    if (root === "includes" || ext === "njk") compileNunjucks();
    if (root === "js" || ext === "js") copyJs();
    if (root === "assets") copyAssets();
  });
};

const args = process.argv.slice(2);

if (args.includes("--sass")) compileSass();
if (args.includes("--nunjucks")) compileNunjucks();
if (args.includes("--js")) copyJs();
if (args.includes("--assets")) copyAssets();

if (args.includes("--build")) build();
if (args.includes("--watch")) watch();
