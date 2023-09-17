if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');
const api_key = process.env.API_KEY;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Pokemon app is listening on port ${port}`);
});

app.get('/pokemon', async (request, response) => {
    const fetchApi = await fetch(
       'https://pokemon-go1.p.rapidapi.com/pokemon_names.json', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': api_key,
                'X-RapidAPI-Host': 'pokemon-go1.p.rapidapi.com'
            }
        }
    );
        const pokemonResponse = await fetchApi.json();
        response.json(pokemonResponse);
        console.log(pokemonResponse);
});

