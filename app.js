// Include Sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db',
    logging: true,
});

//Movie Model
class Movie extends Sequelize.Model {}
Movie.init({
    title: Sequelize.STRING
}, { sequelize });

(async () => {
    await sequelize.sync({ force: true });
    try {
        const movie = await Movie.create({
            title: 'Toy Story',
        });
        const movie2 = await Movie.create({
            title: 'The Incredibles',
        });
        //await sequelize.authenticate();
        //console.log('Connection to the DB successful!');
    } catch (error) {
        console.log('Error connecting to the DB: ', error);
    }
}) ();
