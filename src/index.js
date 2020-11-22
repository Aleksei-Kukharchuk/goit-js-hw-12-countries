import './css/common.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import countryCardsMarkup from './templates/countryCard.hbs';
import countryListMarkup from './templates/countryListMarkup.hbs';

const refs = {
    inputText: document.querySelector('.form-input'),
    countryCardsContainer: document.querySelector('.card-container'),
};

const debounce = require('lodash.debounce');
let inputValue = '';

refs.inputText.addEventListener('input', debounce(onInputText, 500))

function onInputText(evt) {
    evt.preventDefault();
    clearCardsContainer();
    inputValue = evt.target.value;
    
    fetch(`https://restcountries.eu/rest/v2/name/${inputValue}`).then(response => response.json())
        .then(countries => {
            if (countries.length === 1) {
                appendCountryMarkup(countries);
            } else if (countries.length > 10) {
                const myError = error({
                    text: "Too many matches found. Please enter a more specific query!",
                    sticker: false,
                    closer: false,
                    delay: 500
                });
            } else if (countries.status === 404) { 
                const myError = error({
                    text: "Country not found!",
                    sticker: false,
                    closer: false,
                    delay: 500
                });
            } else { 
                appendCountryList(countries);
            }
        })
};

function clearCardsContainer() {
  refs.countryCardsContainer.innerHTML = '';
}

function appendCountryMarkup(countries) { 
        refs.countryCardsContainer.insertAdjacentHTML('afterbegin', countryCardsMarkup(countries));
}
    
 function appendCountryList(countries) { 
        refs.countryCardsContainer.insertAdjacentHTML('afterbegin', countryListMarkup(countries))
    }