import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Track = sequelize.define('track', {
    name:{
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
    primaryKey: true,
    autoIncrement: true,
})

sequelize.sync({ force: false }).then(() => {
    console.log('Track table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Track