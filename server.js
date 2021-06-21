const express = require('express');
const app = express();
const port = 4001

app.use(express.static('public'));

const { Deck, Hand } = require('./app/deck');

const deck = new Deck();

let table = deck.cards;

app.get('/table', (req, res) => {
    res.send(table);
});

app.get('/deck/:size', (req, res) => {
    const { size } = req.params;
    res.send(deck.dispatchCards(parseInt(size)));
});

app.listen(port, () => {
    console.log('Server running on port', port);
});