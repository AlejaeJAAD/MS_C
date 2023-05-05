import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Customer = sequelize.define('customer', {
    customerid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    city:{
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
    email:{
        type: Sequelize.STRING
    },
    company: {
        type: Sequelize.STRING
    },
    state:{
        type: Sequelize.STRING
    },
    fax:{
        type: Sequelize.STRING
    }
},
{
    timestamps: false,
    tableName: 'customer'
})

sequelize.sync({ force: false }).then(() => {
    console.log('Customer table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `customers`').then(() => {
    console.log('Customers table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop Customers table : ', error);
});


export default Customer