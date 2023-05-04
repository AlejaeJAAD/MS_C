import Album from '../models/Album.js'
import Artist from '../models/Artist.js'

export const getAlbums = async (req, res) => {
    await Album.findAll().then(albums => {
        return res.status(200).json({
            data: albums
        })
    }).catch(error => {
        console.error('Unable to retrieve media albums:', error);
    });
}

export const createAlbum = async (req, res) => {
    try {
        const { 
            title,
            artist_id
        } = req.body

        if (artist_id) {
            const artist = await Artist.findByPk(artist_id)
            if (!artist) {
                return res.status(400).json({
                    data: null,
                    message: "Artist does not exists",
            })
            }
        }

        //New album
        const newAlbum = new Album({
            title,
            artist_id
        });
        
        const createdAlbum = await newAlbum.save();
        if (createdAlbum) {
            return res.status(201).json({
                data: createdAlbum,
                message: "Album created sucessfully"
            })
        } else {
            return res.status(400).json({
                data: null,
                message: "Some error when we tried to create the album"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong...'
        })
    }
}