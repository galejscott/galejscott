require('dotenv').config();

const PORT = 3000
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const api_key = process.env.API_KEY;

const app = express();

app.use(cors());
app.get('/word', (req, res) => {

    const options = {
            method: 'GET',
            url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
            params: {
                count: '5',
                wordLength: '5'
        },
            headers: {
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
    };

    axios.request(options).then((response) => {
        console.log(response.data)
        res.json(response.data[0])
    }).catch((error) => {
        console.error(error)
    })

});

app.get('/check', (req, res) => {

    const word = req.query.word;

    const options = {
        method: 'GET',
        url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/',
        params: {entry: word},
        headers: {
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
        }   
    };

    axios.request(options).then((response) => {
        console.log(response.data)
        res.json(response.data.result_msg)
    }).catch((error) => {
        console.error(error)
    })

});



app.listen(PORT, () => console.log('Server running on port ' + PORT));