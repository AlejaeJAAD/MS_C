import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Track = sequelize.define('track', {
    trackid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    composer:{
        type: Sequelize.STRING
    },
    milliseconds:{
        type: Sequelize.INTEGER
    },
    bytes:{
        type: Sequelize.INTEGER
    },
    unitPrice:{
        type: Sequelize.FLOAT
    },
},
{
    timestamps: false,
    tableName: 'track'
})

sequelize.sync({ force: false }).then(() => {
    console.log('Track table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `tracks`').then(() => {
    console.log('Tracks table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop Tracks table : ', error);
});

export default Track