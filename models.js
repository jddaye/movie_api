const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavorieMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

//ADD SCHEMAS FOR GENRES, DIRECTORS, AND ACTORS

let genreSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true}
});

let directorSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Bio: {type: String, required: true}
});

let actorSchema = mongoose.Schema({
    Name: {type: String, required: true}
});

//ADD LET STATEMENTS FOR GENRES, DIRECTORS, AND ACTORS

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);
let Actor = mongoose.model('Actor', actorSchema);

//ADD EXPORTS FOR GENRES, DIRECTORS, AND ACTORS

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
module.exports.Actor = Actor;