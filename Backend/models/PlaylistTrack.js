import Sequelize from 'sequelize';
import { sequelize } from '../configure-db.js'

const PlaylistTrack = sequelize.define('playlistTrack', {
},
{
    timestamps: false,
    tableName: 'playlistTrack'
})

sequelize.sync({ force: false }).then(() => {
    console.log('PlaylistTracks table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

sequelize.query('DROP TABLE IF EXISTS `playlistTracks`').then(() => {
    console.log('PlaylistTracks table dropped successfully!');
}).catch((error) => {
    console.error('Unable to drop PlaylistTracks table : ', error);
});


export default PlaylistTrack