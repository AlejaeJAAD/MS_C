import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Genre = sequelize.define('genre', {
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
    console.log('Genre table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Genre