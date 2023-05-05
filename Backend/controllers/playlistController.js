import Playlist from '../models/Playlist.js'

export const getPlaylists = async (req, res) => {
    await Playlist.findAll().then(playlists => {
        return res.status(200).json({
            data: playlists
        })
    }).catch(error => {
        console.error('Unable to retrieve media playlists:', error);
    });
}

export const createPlaylist = async (req, res) => {
    try {
        const { 
            name
        } = req.body

        //New media type
        const newPlaylist = new Artist({
            name
        });
        
        const createdPlaylist = await newPlaylist.save();
        if (createdPlaylist) {
            return res.status(201).json({
                data: newPlaylist,
                message: "Playlist created sucessfully"
            })
        } else {
            return res.status(400).json({
                data: null,
                message: "Some error when we tried to create the playlist"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong...'
        })
    }
}