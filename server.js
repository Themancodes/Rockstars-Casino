const express = require('express');
const app = express();
const port = 8080

app.use(express.static('public'));
app.use(express.json())

const { Deck, Hand } = require('./app/deck');

const deck = new Deck();

let table = deck.dispatchCards(5);

app.get('/table', (req, res) => {
    res.send(table);
});

app.get('/deck/:size', (req, res) => {
    const { size } = req.params;
    res.send(deck.dispatchCards(parseInt(size)));
});

app.post('/set-user', (req, res) => {
    const { user } = req.body;
    users[user] = {
        name: user,
        lastLoginAt: +(new Date())
    }
    res.send({ ok: true });
});

app.get('/admin', (req, res) => {
    res.send({ users });
});

app.listen(port, () => {
    console.log('Server running on port', port);
});