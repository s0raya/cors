const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());

app.get('/', (req,res) => {
    res.redirect('http://localhost:3000/characters')
});

app.get('/characters', async (req,res) => {
    const url = 'https://rickandmortyapi.com/api/character'

    try {
        const response = await axios.get(url);
        const characters = response.data.results;
        res.json({characters})
    } catch(error) {
        res.status(404).json({err: 'No se pudieron obtener los datos'})
    }
});

app.get('/characters/:name', async (req,res) => {
    const characterName = req.params.name;
    const url = `https://rickandmortyapi.com/api/character/?name=${characterName}`
    try {
        const response = await axios.get(url);
        const {name, status, species, gender, origin: {name: originName}, image} = response.data.results[0];
        res.json({name, status, species, gender, origin: {name: originName}, image})
    } catch (error) {
        res.status(404).json({err: 'No se pudo obtener el personaje'})
    }
})

app.listen(3000, () => {
    console.log('Express esta escuchando en http://localhost:3000');
})