import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const loginSchema = sequelize.define('loginSchema', {
    loginDate: {
        type: Sequelize.DATE
    },
    loginIP: {
        type: Sequelize.DATE
    },
    uid: {
        type: Sequelize.INTEGER
    },
},
{
    timestamps: true,
})

// Employee.belongsTo(loginSchema, {
//     foreignKey: 'uid',
// });

sequelize.sync({ force: false }).then(() => {
    console.log('loginSchema table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default loginSchema