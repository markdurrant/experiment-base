let fixPosition = el => {
  if (el.getAttribute('style')) {
    return;
  }

  let x = el.getBoundingClientRect().x;
  let y = el.getBoundingClientRect().y;

  el.setAttribute('style', `position: fixed; top: ${y + 'px'}; left: ${x + 'px'};`);
}

let unFixPosition = el => {
  el.setAttribute('style', '');
};

let left = document.querySelector('.panel-left');
let middle = document.querySelector('.panel-middle');
let right = document.querySelector('.panel-right');

window.addEventListener('scroll', e => {
  let offset = window.innerHeight - 320;

  if (window.scrollY > left.getBoundingClientRect().height - offset) {
    fixPosition(left);
  } else  {
    unFixPosition(left);
  }

  if (window.scrollY > middle.getBoundingClientRect().height - offset) {
    fixPosition(middle);
  } else  {
    unFixPosition(middle);
  }
});