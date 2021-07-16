export default function fetchCountries(name) {
  const url = `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;flag;languages`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
