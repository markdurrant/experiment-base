let fixPosition = el => {
  let x = el.getBoundingClientRect().x;
  let y = el.getBoundingClientRect().y;

  el.setAttribute('style', `position: fixed; top: ${y + 'px'}; left: ${x + 'px'};`);
}

let unFixPosition = el => {
  el.setAttribute('style', '');
};

let left = document.querySelector('.panel-left');
let right = document.querySelector('.panel-right');

window.addEventListener('scroll', e => {
  let offset = window.innerHeight - 300;

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

document.querySelector('.modal').addEventListener('click', () => {
  document.querySelector('.modal').classList.toggle('closed');

  document.querySelector('body').classList.toggle('modal-open');
});