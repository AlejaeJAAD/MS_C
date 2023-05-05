import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const Playlist = sequelize.define('playlist', {
    playlistid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING
    }
},
{
    timestamps: false,
    tableName: 'playlist'
})

sequelize.sync({ force: false }).then(() => {
    console.log('Playlist table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `playlists`').then(() => {
    console.log('Playlists table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop Playlists table : ', error);
});


export default Playlist