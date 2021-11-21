const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = ('uuid');

const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Actors = Models.Actor;
const Genres = Models.Genre;

//mongoose.connect('mongodb://localhost:27017/moviesAPI', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('common'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors'); //!!!!!Make sure this is before any route middleware
app.use(cors());

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

const {check, validationResult} = require('express-validator');

// Gets the list of data about ALL movies

app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

//Gets the data about a single movie, by name

app.get('/movies/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({Name: req.params.Name})
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the list of data about ALL actors

app.get('/actors', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.get('/actors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.get('/directors', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.get('/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Directors.findOne({Name: req.params.Name})
        .then((directors) => {
            res.json(directors);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the list of data about ALL genres

app.get('/genres', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.get('/genres/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.post('/users',
    [
        check('Username', 'Username is required').isLength({min: 5}),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail
    ()
    ], (req, res) => {
        let errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array() });
        }

        let hashedPassword = Users.hashPassword(req.body.Password);
        Users.findOne({Username: req.body.Username})
            .then((user) => {
                if(user) {
                 return res.status(400).send(req.body.Username + ' already exists');
             } else {
                 Users
                    .create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Birthday: req.body.Birthday,
                        Email: req.body.Email
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

app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req,res) => {
    Users.findOneAndUpdate({Usernme: req.params.Username}, {
        $set:
            {
                Username: req.body.Username,
                Password: req.body.Password,
                Birthday: req.body.Birthday,
                Email: req.body.Email
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

app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
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

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});