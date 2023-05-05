import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const MediaTypes = sequelize.define('mediaTypes', {
    mediatypeid: {
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
    tableName: 'mediatype'
})

sequelize.sync({ force: false }).then(() => {
    console.log('MediaTypes table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `mediatypes`').then(() => {
    console.log('Mediatypes table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop MediaTypes table : ', error);
});

export default MediaTypes