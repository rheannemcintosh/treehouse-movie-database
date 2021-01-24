const db = require('./db');
const { Actor } = db.models;
const { Movie } = db.models;

(async () => {
    await db.sequelize.sync({ force: true });

    try {
        await Movie.create({
            title: 'Toy Story',
            runtime: 81,
            releaseDate: '1995-11-22',
            isAvailableOnVHS: true,
        });
        await Movie.create({
            title: 'The Incredibles',
            runtime: 115,
            releaseDate: '2004-04-14',
            isAvailableOnVHS: true,
        });
        await Actor.create({
            firstName: 'Tom',
            lastName: 'Hanks',
        })
        
        const movie3 = await Movie.build({
            title: 'Toy Story 3',
            runtime: 103,
            releaseDate: '2010-06-18',
            // isAvailableOnVHS: false,
        });
        await movie3.save(); // save the record
        console.log(movie3.toJSON());

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
        } else {
            throw error;
        }
    }
}) ();
