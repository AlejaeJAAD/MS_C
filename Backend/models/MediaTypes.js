import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const MediaTypes = sequelize.define('mediaTypes', {
    name:{
        type: Sequelize.STRING
    },
},
{
    timestamps: false,
    primaryKey: true,
    autoIncrement: true,
})

sequelize.sync({ force: false }).then(() => {
    console.log('MediaTypes table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default MediaTypes