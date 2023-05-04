import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const registerSchema = sequelize.define('registerSchema', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    uid: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: true
});

sequelize.sync({ force: false }).then(() => {
    console.log('registerSchema table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default registerSchema