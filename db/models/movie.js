// Require Sequelize
const Sequelize = require('sequelize');

// Export initalised Movie model
module.exports = (sequelize) => {
    class Movie extends Sequelize.Model {}
    Movie.init({
        title: Sequelize.STRING,
    }, { sequelize });
    
    return Movie;
};