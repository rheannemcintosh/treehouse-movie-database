const db = require('./db');
const { Movie, Actor } = db.models;
const { Op } = db.Sequelize;

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

        // Find Movie By Primary Key
        const movieById = await Movie.findByPk(1);
        console.log(movieById.toJSON());

        // Find One Movie
        const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
        console.log(movieByRuntime.toJSON());
    
        // Find All Movies
        const allMovies = await Movie.findAll();
        console.log( allMovies.map(movie => movie.toJSON()) );

        // Filter Movies
        const people = await Actor.findAll({
            where: {
              lastName: 'Hanks'
            }
        });
        // SELECT * FROM People WHERE lastName = 'Hanks';
        console.log( people.map(person => person.toJSON()) );

        const movies = await Movie.findAll({
            attributes: ['id', 'title'], // return only id and title
            where: {
              runtime: 81,
              isAvailableOnVHS: true
            }
        });
        // SELECT * FROM Movies WHERE runtime = 92 AND isAvailableOnVHS = true;
        console.log( movies.map(movie => movie.toJSON()) );

        const moviesReleaseDate = await Movie.findAll({
            attributes: ['id', 'title'],
            where: {
                releaseDate: {
                    [Op.gte]: '2004-01-01' // greater than or equal to the date
                },
                runtime: {
                    [Op.gt]: 95, // greater than 95
                    //[Op.between]: [75, 115]
                },
                title: {
                    [Op.endsWith]: 'story'
                    //[Op.startsWith]: 'toy'
                }
            },
        });
        console.log( moviesReleaseDate.map(movie => movie.toJSON()) );

        const orderMovies = await Movie.findAll({
            attributes: ['id', 'title'],
            where: {
                title: {
                    [Op.endsWith]: 'story'
                },        
            },
            order: [['id', 'DESC']] // IDs in descending order
            //order: [['releaseDate', 'ASC']],
        });
        console.log( orderMovies.map(movie => movie.toJSON()) );

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
        } else {
            throw error;
        }
    }
}) ();
