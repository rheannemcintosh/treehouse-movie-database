// Require Sequelize
const Sequelize = require('sequelize');

// Export initalised Actor model
module.exports = (sequelize) => {
    class Actor extends Sequelize.Model {}
    Actor.init({
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "firstName"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "firstName"',
                },
            },
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "lastName"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "lastName"',
                },
            },
        },
    }, { sequelize });
    
    return Actor;
};