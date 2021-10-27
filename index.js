const express = require('express'),
    bodyParser = require('body-parser'),
    uuid = ('uuid');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require('mongoose');
const Models = require('./models.js'),

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/collectionMovies', {useNewUrlParser: true, useUnifiedTopology: true});

// let movies = [
//     {
//         movie: 'Silver Linings Playbook',
//         actor: 'Jennifer Lawrence',
//         director: 'David O. Russell',
//         genre: 'Drama'
//     },

//     {
//         movie: 'About Time',
//         actor: 'Rachel McAdams',
//         director: 'Richard Curtis',
//         genre: 'Fantasy'
//     },

//     {
//         movie: 'Me Before You',
//         actor: 'Emilia Clarke',
//         director: 'Thea Sharrock',
//         genre: 'Romance'
//     },

//     {
//         movie: 'Joy',
//         actor: 'Jennifer Lawrence',
//         director: 'David O. Russell',
//         genre: 'Biography'
//     },

//     {
//         movie: 'American Hustle',
//         actor: 'Jennifer Lawrence',
//         director: 'David O. Russell',
//         genre: 'Crime'
//     },

//     {
//         movie: 'The Edge of Seventeen',
//         actor: 'Hailee Steinfeld',
//         director: 'Kelly Fremon Craig',
//         genre: 'Comedy'
//     },

//     {
//         movie: 'Someone Great',
//         actor: 'Gina Rodriguez',
//         director: 'Jennifer Kaytin Robinson',
//         genre:  'Comedy'
//     },

//     {
//         movie: 'Crazy Rich Asians',
//         actor: 'Constance Wu',
//         director: 'Jon M. Chu',
//         genre:  'Drama'
//     },

//     {
//         movie: 'Holidate',
//         actor: 'Emma Roberts',
//         director: 'John Whitesell',
//         genre:  'Comedy'
//     },

//     {
//         movie: 'Last Christmas',
//         actor: 'Emilia Clarke',
//         director: 'Paul Feig',
//         genre:  'Romance'
//     },
// ];

// let users = [
//     {
//         id: 1,
//         name: 'Jessica Drake',
//         favorites: {
//             movie: 'Silver Linings Playbook',
//             movie: 'Someone Great'
//         }
//     },

//     {
//         id: 2,
//         name: 'Ben Cohen',
//         favorites: {
//             movie: 'The Hunger Games',
//             movie: 'House at the End of the Street'
//         }
//     },

//     {
//         id: 3,
//         name: 'Lisa Downing',
//         favorites: {
//             movie: 'The Edge of Seventeen',
//             movie: 'Me Before You'
//         }
//     },
// ]

//Gets the list of data about ALL movies

app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the data about a single movie, by title

app.get('/movies/:Movie', (req, res) => {
    Movies.findOne({Title: req.params.Title})
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the list of data about ALL actors

app.get('/actors', (req, res) => {
    Actors.find()
        .then((actors) => {
            res.status(201).json(actors);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the data about a single actor, by name

app.get('/actors/:Name', (req, res) => {
    Actors.findOne({Name: req.params.Name})
        .then((actors) => {
            res.json(actors);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the list of data about ALL directors

app.get('/directors', (req, res) => {
    Directors.find()
        .then((directors) => {
            res.status(201).json(directors);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the data about a single director, by name

app.get('/directors/:Name', (req, res) => {
    Directors.findOne({Name: req.params.Username})
        .then((directors) => {
            res.json(directors);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the list of data about ALL genres

app.get('/genres', (req, res) => {
    Genres.find()
        .then((genres) => {
            res.status(201).json(genres);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the data about a single genre, by name

app.get('/genres/:Name', (req, res) => {
    Genres.findOne({Name: req.params.Name})
        .then((genres) => {
            res.json(genres);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the list of data about ALL users

app.get('/users', (req, res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the data about a single user, by name

app.get('/users/:Username', (req, res) => {
    Users.findOne({Username: req.params.Username})
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Adds data for a new user to our list of users

app.post('/users', (req, res) => {
    Users.findOne({Username: req.body.Username})
        .then((user) => {
            if(user) {
                return res.status(400).send(req.body.Username + ' already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => {res.status(201).json(user)})
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Update a user's info, by username

app.put('/users/:Username', (req,res) => {
    Users.findOneAndUpdate({Usernme: req.params.Username}, {
        $set:
            {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
    },
    {new: true},
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

//Deletes a user from our list of users 

app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({Username: req.params.Username})
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Adds a movie to the user's favorites

app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username}, {
        $push: {FavoriteMovies: req.params.MovieID}
    },
    {new: true},
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});


//Removes a movie from the user's favorites

app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username}, {
        $pull: {FavoriteMovies: req.params.MovieID}
    },
    {new: true},
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

app.use(express.static('documentation'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something somewhere broke...')
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
});