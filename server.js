const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

app.post('/fetchDataFromUrl', async (req, res) => {
    const url = req.body.url;

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const titleText = $('title').text();
        const boardGameName = titleText.split('|')[0].trim();

        const pos = html.indexOf('averageweight');
        const extractedString = html.slice(pos + 15, pos + 32);

        const extractedData = {
            jogo: boardGameName,
            peso: extractedString
        };

        fs.writeFileSync('data.json', JSON.stringify(extractedData, null, 2), 'utf-8');

        res.json(extractedData);
    } catch (error) {
        console.error("Whoopsie! Ran into an issue.", error);
        res.status(500).send("Something went wrong!");
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
