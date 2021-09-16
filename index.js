const express = require('express');
    morgan = require('morgan');
const app = express();
app.use(morgan('common'));

let topTenMovies = [
    {
        name: 'Harry Potter Series',
        year: '2001 - 2011'
    },
    {
        name: 'Troy',
        year: '2004'
    },
    {
        name: 'Aladdin',
        year: '1992'
    },
    {
        name: 'Beauty and the Beast',
        year: '1991'
    },
    {
        name: 'The Little Mermaid',
        year: '1989'
    },
    {
        name: 'Whiplash',
        year: '2014'
    },
    {
        name: 'Tomb Raider',
        year: '2018'
    },
    {
        name: 'Les Miserables',
        year: '2012'
    },
    {
        name: 'Silver Linings Playbook',
        year: '2012'
    },
    {
        name: 'House at the End of the Street',
        year: '2012'
    },
];

app.get('/movies', (req, res) => {
    res.json(topTenMovies);
});

app.get('/', (req, res) => {
    let responseText = 'Welcome to the first ten movies I could think of';
    res.send(responseText);
});

app.use(express.static('documentation'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something somewhere broke...')
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
});