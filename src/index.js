import './css/styles.css';

// const DEBOUNCE_DELAY = 300;

const nameCountry = fetch('https://restcountries.eu/rest/v2/name/germany')
  .then(response => {
    return response.json();
  })
  .then(name => {
    console.log(name);
  })
  .catch(error => {
    console.log(error);
  });
