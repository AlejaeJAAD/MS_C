import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Artist = sequelize.define('artist', {
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
    console.log('Artist table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Artist