if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch-commonjs');
const api_key = process.env.API_KEY;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Dinosaur Generator app is listening on port ${port}`);
});

app.get('/dinoname', async (request, response) => {
    const fetchApi = await fetch(
       'https://dinoipsum.com/api/?format=json&words=2&paragraphs=1'
    );
        const dinoNameResponse = await fetchApi.json();
        console.log(dinoNameResponse);
        response.json(dinoNameResponse);
});

app.get('/dinoimage', async (request, response) => {
    const fetchApi = await fetch(
        'https://bing-image-search1.p.rapidapi.com/images/search?q=dinosaur&count=10', {
            method: 'GET',
	        headers: {
		        'X-RapidAPI-Key': api_key,
		        'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
	        }
        }
    );
        const dinoImageResponse = await fetchApi.json();
        console.log(dinoImageResponse);
        response.json(dinoImageResponse);
});
