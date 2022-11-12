import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const INFO_MESSAGE =
  'Too many matches found. Please enter a more specific name.';
const ERROR_MESSAGE = 'Oops, there is no country with that name';
const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
};

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const searchText = evt.target.value.trim();
  if (!searchText) {
    removeMarkup();
  } else {
    fetchCountries(searchText).then(createMarcup).catch(onFetchError);
  }
}

function createMarcup(countries) {
  if (countries.length !== 1) {
    const markup = countries
      .map(({ name, flags }) => {
        return `
        <li><img src="${flags.svg}" alt="flag" width="50"><span>${name.official}</span></li>`;
      })
      .join('');
    refs.countryList.innerHTML = markup;

  } else {const markup = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `
    <li><img src="${flags.svg}" alt="flag" width="50"> 
    <span>${name.official}</span></li>
    <li>Capital: <span>${capital}</span></li>
    <li>Population: <span>${population}</span></li>
    <li>Languages: <span>${Object.values(languages)}</span></li>`;
    })
    .join('');
    refs.countryList.innerHTML = markup;}
    
  if (countries.length > 10) {
    Notify.info(INFO_MESSAGE);
    removeMarkup();
  }
}

function removeMarkup() {
  refs.countryList.innerHTML = '';
}

function onFetchError() {
  removeMarkup();
  Notify.failure(ERROR_MESSAGE);
}