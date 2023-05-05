import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Artist = sequelize.define('artist', {
    artistid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
},
{
    timestamps: false,
    tableName: 'artist'
})

sequelize.sync({ force: false }).then(() => {
    console.log('Artist table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `artists`').then(() => {
    console.log('Artists table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop Artists table : ', error);
});

export default Artist