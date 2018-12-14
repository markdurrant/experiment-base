let fixPosition = el => {
  let x = el.getBoundingClientRect().x;
  let y = el.getBoundingClientRect().y;

  el.setAttribute('style', `position: fixed; top: ${y + 'px'}; left: ${x + 'px'};`);
}

let unFixPosition = el => {
  el.setAttribute('style', '');
};

let left = document.querySelector('.left');
let right = document.querySelector('.right');

window.addEventListener('scroll', e => {
  let offset = window.innerHeight + 320;

  if (window.scrollY > left.getBoundingClientRect().height - offset) {
    fixPosition(left);
  } else  {
    unFixPosition(left);
  }

  if (window.scrollY > right.getBoundingClientRect().height - offset) {
    fixPosition(right);
  } else  {
    unFixPosition(right);
  }
});