import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Album = sequelize.define('album', {
    title:{
        type: Sequelize.STRING
    },
},
{
    timestamps: false,
    primaryKey: true,
    autoIncrement: true,
})

sequelize.sync({ force: false }).then(() => {
    console.log('Album table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Album