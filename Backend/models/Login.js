import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Login = sequelize.define('login', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    loginDate: {
        type: Sequelize.DATE
    },
    loginIP: {
        type: Sequelize.DATE
    },
},
{
    timestamps: true,
    tableName: 'login'
})

sequelize.sync({ force: false }).then(() => {
    console.log('login table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `loginschemas`').then(() => {
    console.log('Loginschema table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop Logins table : ', error);
});

export default Login