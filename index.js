const express = require('express'),
    bodyParser = require('body-parser'),
    uuid = ('uuid');

const app = express();

app.use(bodyParser.json());

let movies = [
    {
        movie: 'Harry Potter and the Sorcerer"s Stone',
        director: 'Chris Columbus',
        genre: 'Fantasy'
    },

    {
        movie: 'Harry Potter and the Chamber of Secrets',
        director: 'Chris Columbus',
        genre: 'Fantasy'
    },

    {
        movie: 'Harry Potter and the Prisoner of Azkaban',
        director: 'Alfonso Cuarón',
        genre: 'Fantasy'
    },

    {
        movie: 'Harry Potter and the Goblet of Fire',
        director: 'Mike Newell',
        genre: 'Fantasy'
    },

    {
        movie: 'Harry Potter and the Order of the Phoenix',
        director: 'David Yates',
        genre: 'Fantasy'
    },

    {
        movie: 'Harry Potter and the Half-Blood Prince',
        director: 'David Yates',
        genre: 'Fantasy'
    },

    {
        movie: 'Harry Potter and the Deathly Hallows - Part 1',
        director: 'David Yates',
        genre: 'Fantasy'
    },

    {
        movie: 'Harry Potter and the Deathly Hallows - Part 2',
        director: 'David Yates',
        genre: 'Fantasy'
    }
];

let users = [
    {
        id: 1,
        name: 'Jessica Drake',
        favorites: {
            movie: 'Harry Potter and the Sorcerer"s Stone',
            movie: 'Harry Potter and the Half-Blood Prince',
        }
    },

    {
        id: 2,
        name: 'Ben Cohen',
        favorites: {
            movie: 'Harry Potter and the Order of the Phoenix',
            movie: 'Harry Potter and the Chamber of Secrets',
        }
    },

    {
        id: 3,
        name: 'Lisa Downing',
        favorites: {
            movie: 'Harry Potter and the Prisoner of Azkaban',
            movie: 'Harry Potter and the Globet of Fire',
        }
    },
]

//Gets the list of data about ALL movies

app.get('/movies', (req, res) => {
    res.json(movies);
});

//Gets the data about a single movie, by name

app.get('/movies/:movie', (req, res) => {
    res.json(movies.find((movies) => 
        { return movies.movie === req.params.movie }));
});

//Gets the list of data about ALL directors

app.get('/directors', (req, res) => {
    res.json(directors);
});

//Gets the data about a single director, by name

app.get('/directors/:name', (req, res) => {
    res.json(directors.find((directors) =>
        { return directors.name === req.params.name }));
});

//Gets the list of data about ALL genres

app.get('/genres', (req, res) => {
    res.json(genres);
});

//Gets the data about a single genre, by name

app.get('/genres/:name', (req, res) => {
    res.json(genres.find((genres) => 
        { return genres.name === req.params.name }));
});

//Adds data for a new user to our list of users

app.post('/users', (req, res) => {
    let newUser = req.body;

    if (!newUser.name) {
        const message = 'Missing name in request body';
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).send(newUser);
    }
});

//Deletes a user from our list of users

app.delete('users/:name', (req, res) => {
    let user = users.find((user) => { return user.name === req.params.name });
});

    if (user) {
        users = users.filter((obj) => { return obj.name !== req.params.name });
        res.status(201).send('User ' + req.params.name + ' was deleted.');
    };

//Adds a movie to the user's favorites

app.put('/users/:name/:favorites', (req, res) => {
    let user = users.find((user) => { return user.name === req.params.name });

    if (user) {
        user.favorites[req.params.favorites] = parseInt(req.params.movie);
        res.status(201).send(req.params.name + " added " + req.params.movie + " to " + req.params.favorites);
    } else {
        res.status(404).send(req.params.movie + " was not added to " + req.params.favorites);   
    }
});


//Removes a movie from the user's favorites

app.delete('/users/:name/:favorites', (req, res) => {
    let user = users.find((user) => { return user.name === req.params.name });

    if (user) {
        users = users.filter((obj) => { return obj.favorites !== req.params.favorites });
            res.status(201).send(req.params.favorites + ' was deleted.');
    }
});

app.use(express.static('documentation'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something somewhere broke...')
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
});