const db = require('./db');
const { Movie } = db.models;

(async () => {
    await db.sequelize.sync({ force: true });

    try {
        await Movie.create({
            title: 'Toy Story',
        });
        await Movie.create({
            title: 'The Incredibles',
        });
        
    } catch (error) {
        console.log('Error connecting to the DB: ', error);
    }
}) ();
