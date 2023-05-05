import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const invoiceLine = sequelize.define('invoiceLine', {
    invoicelineid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    unitPrice: {
        type: Sequelize.FLOAT
    },
    quantity:{
        type: Sequelize.INTEGER
    },
},
{
    timestamps: false,
    tableName: 'invoiceLine'
})

sequelize.sync({ force: false }).then(() => {
    console.log('Invoice Items table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `invoiceLines`').then(() => {
    console.log('InvoiceLines table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop InvoiceLines table : ', error);
});

export default invoiceLine