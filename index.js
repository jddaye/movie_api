const express = require('express');
const app = express();

let topTenMovies = [
    {
        name: 'Harry Potter Series'
        year: '2001 - 2011'
    }
    
    {
        name: 'Troy'
        year: '2004'
    }

    {
        name: 'Aladdin'
        year: '1992'
    }

    {
        name: 'Beauty and the Beast'
        year: '1991'
    }

    {
        name: 'The Little Mermaid'
        year: '1989'
    }

    {
        name: 'Whiplash'
        year: '2014'
    }

    {
        name: 'Tomb Raider'
        year: '2018'
    }

    {
        name: 'Les Miserables'
        year: '2012'
    }

    {
        name: 'Silver Linings Playbook'
        year: '2012'
    }

    {
        name: 'House at the End of the Street'
        year: '2012'
    }
];

app.get('/movies', (req, res) => {
    res.json(topTenMovies);
});

app.get('/', (req, res) => {
    res.send('Welcome to the first ten movies I could think of');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
});