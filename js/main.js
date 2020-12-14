const onColumnInput = () => {
  const noColumns = document.querySelector(".column-input").value;
  const gapSize = document.querySelector(".gap-input").value;

  document.querySelector(".columns").style = `columns: ${noColumns}; gap: ${
    gapSize + "rem"
  };`;
};

const onAnimationInput = () => {
  let v = document.querySelector(".animation-speed-input").value;
  let speed = v < 2 ? 0 : (101 - v) / 10;

  console.log(v, speed);

  document.querySelector(".animation").style = `animation-duration: ${
    speed + "s"
  };`;
};

const onFontInput = () => {
  let wght = document.querySelector(".font-weight-input").value;
  let slnt = document.querySelector(".font-slant-input").value;
  let FLAR = document.querySelector(".font-flair-input").value;

  document.querySelector(
    ".variable-fonts"
  ).style = `font-variation-settings: "wght" ${wght}, "slnt" ${slnt}, "FLAR" ${FLAR}, "VOLM" 0;`;
};
