import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Genre = sequelize.define('genre', {
    genreid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    tableName: 'genre' // set the table name explicitly to 'genre'
});

sequelize.sync({ force: false }).then(() => {
    console.log('Genre table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `genres`').then(() => {
    console.log('Genres table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop Genres table : ', error);
});

export default Genre;