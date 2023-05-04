import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Employee = sequelize.define('employee', {
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
    }
},
{
    timestamps: false,
    primaryKey: true,
    autoIncrement: true,
    })

// Employee.hasMany(loginSchema, {
//     foreignKey: 'uid',
// });

sequelize.sync({ force: false }).then(() => {
    console.log('Employee table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Employee