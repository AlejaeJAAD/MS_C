import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const invoiceItems = sequelize.define('invoiceItems', {
    unitPrice: {
        type: Sequelize.FLOAT
    },
    quantity:{
        type: Sequelize.INTEGER
    },
},
{
    timestamps: false,
    primaryKey: true,
    autoIncrement: true,
})

sequelize.sync({ force: false }).then(() => {
    console.log('Invoice Items table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default invoiceItems