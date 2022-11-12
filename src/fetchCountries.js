const baseUrl = 'https://restcountries.com/v3.1';
const filter = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
    return fetch(`${baseUrl}/name/${name}?fields=${filter}`).then(response => {
        if (!response.ok) {
            throw new Error(`is not ok: ${response.status}`);
        } else {
            return response.json();
        }
    });
}