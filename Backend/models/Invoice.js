import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Invoice = sequelize.define('invoice', {
    invoiceDate:{
        type: Sequelize.DATE
    },
    billingAddress:{
        type: Sequelize.STRING
    },
    billingCity:{
        type: Sequelize.STRING
    },
},
{
    timestamps: false,
    primaryKey: true,
    autoIncrement: true,
})

sequelize.sync({ force: false }).then(() => {
    console.log('Invoice table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Invoice