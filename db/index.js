// Require Sequelize
const Sequelize = require('sequelize');

// Configure the Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db'
});

// Configure the Database
const db = {
  sequelize,
  Sequelize,
  models: {},
};

// Load the Movie model
db.models.Movie = require('./models/movie.js')(sequelize);
db.models.Actor = require('./models/actor.js')(sequelize);

// Export the Database
module.exports = db;