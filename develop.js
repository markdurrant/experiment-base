const fs = require("fs");
const sass = require("sass");

const input = {
  sass: "./src/sass/styles.scss",
};

const output = {
  sass: "./dist/css/styles.css",
};

const timeNow = () => {
  const now = new Date();

  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

const compileSass = () => {
  const cssDir = output.sass.split(".css")[0];

  let css;

  try {
    css = sass.compile(input.sass).css;
  } catch (error) {
    console.error(error.message);

    return;
  }

  fs.mkdirSync(cssDir, { recursive: true });
  fs.writeFileSync(output.sass, css);

  console.log(`Compiled ${input.sass} @ ${timeNow()}\n`);
};

const args = process.argv.slice(2);

if (args.includes("--sass")) compileSass();
