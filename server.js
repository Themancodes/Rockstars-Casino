const express = require('express');
const app = express();
const cors = require('cors');
var path = require('path')
const port = 8080

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors());

const { Deck, Hand } = require('./app/deck');

const deck = new Deck();

let table = deck.dispatchCards(5);
// let table = deck.cards;


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