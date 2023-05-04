import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Customer = sequelize.define('customer', {
    lastName: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    company: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    city:{
        type: Sequelize.STRING
    },
    state:{
        type: Sequelize.STRING
    },
    country:{
        type: Sequelize.STRING
    },
    postalCode:{
        type: Sequelize.STRING
    },
    phone:{
        type: Sequelize.STRING
    },
    fax:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    }
},
{
    timestamps: false,
    primaryKey: true,
    autoIncrement: true,
})

sequelize.sync({ force: false }).then(() => {
    console.log('Customer table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Customer