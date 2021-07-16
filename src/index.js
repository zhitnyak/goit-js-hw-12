import './css/style.css';
import getRefs from './js/country-refs';
import countryCardTpl from './templates/country-card.hbs';
import countryInfoTpl from './templates/country-info.hbs';

import fetchCountries from './js/fetchCountries';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = getRefs();
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  evt.preventDefault();

  const searchQuery = evt.target.value.trim();
  console.log(searchQuery);

  if (searchQuery === '') {
    clearData();
    return;
  }
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length === 1) {
        clearData();
        refs.countryCard.innerHTML = countryCardTpl(data);
      }
      return data;
    })
    .then(data => {
      if (data.length > 1 && data.length <= 10) {
        clearData();
        refs.countryInfo.innerHTML = countryInfoTpl(data);
      }
      return data;
    })
    .then(data => {
      if (data.length > 10) {
        clearData();
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(error => {
      clearData();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function clearData() {
  refs.countryCard.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
