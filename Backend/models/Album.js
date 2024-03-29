import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Album = sequelize.define('album', {
    albumid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
},
{
    timestamps: false,
    tableName: 'album'
})

sequelize.sync({ force: false }).then(() => {
    console.log('Album table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `albums`').then(() => {
    console.log('Albums table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop Albums table : ', error);
});

export default Album