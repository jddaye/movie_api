const express = require('express'),
    bodyParser = require('body-parser'),
    uuid = ('uuid');

const app = express();

app.use(bodyParser.json());

let movies = [
    {
        movie: 'Silver Linings Playbook',
        actor: 'Jennifer Lawrence',
        director: 'David O. Russell',
        genre: 'Romance'
    },

    {
        movie: 'About Time',
        actor: 'Rachel McAdams',
        director: 'Richard Curtis',
        genre: 'Fantasy'
    },

    {
        movie: 'Me Before You',
        actor: 'Emilia Clarke',
        director: 'Thea Sharrock',
        genre: 'Romance'
    },

    {
        movie: 'Joy',
        actor: 'Jennifer Lawrence',
        director: 'David O. Russell',
        genre: 'Biography'
    },

    {
        movie: 'American Hustle',
        actor: 'Jennifer Lawrence',
        director: 'David O. Russell',
        genre: 'Crime'
    },

    {
        movie: 'House at the End of the Street',
        actor: 'Jennifer Lawrence',
        director: 'Mark Tonderai',
        genre: 'Thriller'
    },

    {
        movie: 'The Hunger Games',
        actor: 'Jennifer Lawrence',
        director: 'Gary Ross',
        genre: 'Adventure',
    },

    {
        movie: 'Winter"s Bone',
        actor: 'Jennifer Lawrence',
        director: 'Debra Granik',
        genre: 'Mystery'
    },

    {
        movie: 'The Edge of Seventeen',
        actor: 'Hailee Steinfeld',
        director: 'Kelly Fremon Craig',
        genre: 'Comedy'
    },

    {
        movie: 'Someone Great',
        actor: 'Gina Rodriguez',
        director: 'Jennifer Kaytin Robinson',
        genre:  'Comedy'
    },
];

let users = [
    {
        id: 1,
        name: 'Jessica Drake',
        favorites: {
            movie: 'Silver Linings Playbook',
            movie: 'Someone Great'
        }
    },

    {
        id: 2,
        name: 'Ben Cohen',
        favorites: {
            movie: 'The Hunger Games',
            movie: 'House at the End of the Street'
        }
    },

    {
        id: 3,
        name: 'Lisa Downing',
        favorites: {
            movie: 'The Edge of Seventeen',
            movie: 'Me Before You'
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

//Gets the list of data about ALL actors

app.get('/actors', (req, res) => {
    res.send('All actors works');
});

//Gets the data about a single actor, by name

app.get('/actors/:name', (req, res) => {
    res.send('Single actor works');
});

//Gets the list of data about ALL directors

app.get('/directors', (req, res) => {
    res.send('All directors works');
});

//Gets the data about a single director, by name

app.get('/directors/:name', (req, res) => {
    res.send('Single director works');
});

//Gets the list of data about ALL genres

app.get('/genres', (req, res) => {
    res.send('All genres works');
});

//Gets the data about a single genre, by name

app.get('/genres/:name', (req, res) => {
    res.send('Single genre works');
});

//Gets the list of data about ALL users

app.get('/users', (req, res) => {
    res.send('All users works');
});

//Gets the data about a single user, by name

app.get('/users/:name', (req, res) => {
    res.send('Single user works');
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

    if (user) {
        users = users.filter((obj) => { return obj.name !== req.params.name });
        res.status(201).send('User ' + req.params.name + ' was deleted.');
    };
});

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