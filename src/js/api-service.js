const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountry(countryID) {
    return fetch(`${BASE_URL}/${countryID}`).then(response => response.json())
        .catch(error => { console.log(error); })
}

export default { fetchCountry };