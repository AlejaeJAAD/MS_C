import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Invoice = sequelize.define('invoice', {
    invoiceid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    invoiceDate:{
        type: Sequelize.DATE
    },
    billingAddress:{
        type: Sequelize.STRING
    },
    billingCity:{
        type: Sequelize.STRING
    },
    billingState:{
        type: Sequelize.STRING
    },
    billingCountry:{
        type: Sequelize.STRING
    },
    billingPostalCode:{
        type: Sequelize.STRING
    },
    total: {
        type: Sequelize.DOUBLE
    }
},
{
    timestamps: false,
    tableName: 'invoice'
})

sequelize.sync({ force: false }).then(() => {
    console.log('Invoice table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `invoices`').then(() => {
    console.log('Invoices table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop Invoices table : ', error);
});

export default Invoice