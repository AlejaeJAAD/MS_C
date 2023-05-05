import PlaylistTrack from '../models/PlaylistTrack.js'

export const getPlaylistTracks = async (req, res) => {
    await PlaylistTrack.findAll().then(playlistTracks => {
        return res.status(200).json({
            data: playlistTracks
        })
    }).catch(error => {
        console.error('Unable to retrieve media playlistTracks', error);
    });
}
    
export const getTracksByPlaylistId = async (req, res) => {
    try {
        const { playlistId } = req.params;

        const tracks = await PlaylistTrack.findAll({
            attributes: ['TrackId'],
            where: { PlaylistId: playlistId }
        });

        const count = tracks.length;

        return res.status(200).json({
            data: tracks,
            count: count,
            message: "Tracks retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong...'
        })
    }
}

export const createPlaylistTrack = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { trackId } = req.body;

        //New media type
        const newPlaylistTrack = new PlaylistTrack({
            playlistid: playlistId,
            trackid: trackId
        });
        
        const createdPlaylistTrack = await newPlaylistTrack.save();
        if (createdPlaylistTrack) {
            return res.status(201).json({
                message: "PlaylistTrack created sucessfully"
            })
        } else {
            return res.status(400).json({
                message: "Some error when we tried to create the playlistTrack"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong...'
        })
    }
}