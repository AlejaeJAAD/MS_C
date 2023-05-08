import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Register = sequelize.define('register', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
}, {
    timestamps: true,
    tableName: 'register'
});

sequelize.sync({ force: false }).then(() => {
    console.log('register table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `registerschemas`').then(() => {
    console.log('Registerschema table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop Registers table : ', error);
});

export default Register