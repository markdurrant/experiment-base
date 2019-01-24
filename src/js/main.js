let loadCountries = () => {
  countriesList.forEach(c => {
    let country = `<li><span class="name">${c.name}</span><span class="flag">${c.flag}</span></li>`;

    document.querySelector('#country-input ul').insertAdjacentHTML('beforeend', country);
  });
};

let cardOpenClose = () => {
  document.querySelectorAll('.card-header').forEach(header => {
    header.addEventListener('click', e => {
      let cardOuter = e.target.closest('.card-outer');

          cardOuter.classList.toggle('open');
          cardOuter.classList.toggle('closed');
    });
  });
};

let filterCountries = () => {
  let countriesFilter = new List('country-input', { valueNames: ['name']});
};

let filterOpenClose = () => {
  let countryInputContainer = document.querySelector('#country-input input');
  let countryInput = document.querySelector('#country-input');

  countryInputContainer.addEventListener('focus', () => {
    countryInput.classList.toggle('open');
    countryInput.classList.toggle('close');
  });

  countryInputContainer.addEventListener('blur', () => {
    countryInput.classList.toggle('open');
    countryInput.classList.toggle('close');
  });
};

let selectCountry = () => {
  document.querySelectorAll('#country-input li').forEach(el => {
    el.addEventListener('click', e => {
      document.querySelector('#country-input input').value = e.target.closest('.name').textContent;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCountries();
  cardOpenClose();
  filterCountries();
  filterOpenClose();
  selectCountry();
});