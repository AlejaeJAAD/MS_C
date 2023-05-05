import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Employee = sequelize.define('employee', {
    employeeid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lastName: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    reportsTo: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    birthDate: {
        type: Sequelize.DATE
    },
    hireDate: {
        type: Sequelize.DATE
    },
    address: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.STRING,
    },
    country: {
        type: Sequelize.STRING,
    },
    postalCode: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    fax: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    }
},
{
    timestamps: false,
    tableName: 'employee'
})

sequelize.sync({ force: false }).then(() => {
    console.log('Employee table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `employees`').then(() => {
    console.log('Employees table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop Employees table : ', error);
});

export default Employee