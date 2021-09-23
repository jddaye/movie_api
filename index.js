const express = require('express'),
    bodyParser = require('body-parser'),
    uuid = ('uuid');

const app = express();

app.use(bodyParser.json());

let movies = [
    {
        movie: 'Silver Linings Playbook',
        actors: {
            name: 'Jennifer Lawrence',
            name: 'Bradley Cooper'
        },
        director: 'David O. Russell',
        genre: {
            type: 'Comedy',
            type: 'Drama',
            type: 'Romance'
        }
    },

    {
        movie: 'About Time',
        actors: {
            name: 'Rachel McAdams',
            name: 'Domhall Gleeson'
        },
        director: 'Richard Curtis',
        genre: {
            type: 'Comedy',
            type: 'Drama',
            type: 'Romance',
            type: 'Fantasy',
            type: 'Sci-Fi'
        }
    },

    {
        movie: 'Me Before You',
        actors: {
            name: 'Emilia Clarke',
            name: 'Sam Clafin'
        },
        director: 'Thea Sharrock',
        genre: {
            type: 'Drama',
            type: 'Romance'
        }
    },

    {
        movie: 'Joy',
        actors: {
            name: 'Jennifer Lawrence',
            name: 'Bradley Cooper'
        },
        director: 'David O. Russell',
        genre: {
            type: 'Biography',
            type: 'Drama',
        }
    },

    {
        movie: 'American Hustle',
        actors: {
            name: 'Jennifer Lawrence',
            name: 'Bradley Cooper',
            name: 'Amy Adams',
            name: 'Christian Bale'
        },
        director: 'David O. Russell',
        genre: {
            type: 'Crime',
            type: 'Drama',
        }
    },

    {
        movie: 'House at the End of the Street',
        actors: {
            name: 'Jennifer Lawrence',
            name: 'Max Thieriot'
        },
        director: 'Mark Tonderai',
        genre: {
            type: 'Drama',
            type: 'Horror',
            type: 'Thriller'
        }
    },

    {
        movie: 'The Hunger Games',
        actors: {
            name: 'Jennifer Lawrence',
            name: 'Josh Hutcherson',
            name: 'Liam Hemsworth'
        },
        director: 'Gary Ross',
        genre: {
            type: 'Action',
            type: 'Adventure',
            type: 'Sci-Fi',
            type: 'Thriller'
        }
    },

    {
        movie: 'Winter"s Bone',
        actors: {
            name: 'Jennifer Lawrence',
            name: 'John Hawkes'
        },
        director: 'Debra Granik',
        genre: {
            type: 'Drama',
            type: 'Mystery'
        }
    },

    {
        movie: 'The Edge of Seventeen',
        actors: {
            name: 'Hailee Steinfeld',
            name: 'Haley Lu Richardson'
        },
        director: 'Kelly Fremon Craig',
        genre: {
            type: 'Comedy',
            type: 'Drama'
        }
    },

    {
        movie: 'Someone Great',
        actors: {
            name: 'Gina Rodriguez',
            name: 'Brittany Snow',
            name: 'DeWanda Wise'
        },
        director: 'Jennifer Kaytin Robinson',
        genre: {
            type: 'Comedy',
            type: 'Romance'
        }
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
    res.send('All genres work');
});

//Gets the data about a single genre, by name

app.get('/genres/:name', (req, res) => {
    res.send('Single genre works');
});

//Gets the list of data about ALL users

app.get('/users', (req, res) => {
    res.send('All users work');
});

//Gets the data about a single user, by name

app.get('/users/:name', (req, res) => {
    res.send('Single users works');
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

//update