document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.card-header').forEach(header => {
    header.addEventListener('click', (e) => {
      let cardOuter = e.srcElement.closest('.card-outer');

          cardOuter.classList.toggle('open');
          cardOuter.classList.toggle('closed');
    });
  });
});