import Track from '../models/Track.js'
import Album from '../models/Album.js'
import Genre from '../models/Genre.js'
import MediaType from '../models/MediaTypes.js'

export const getTracks = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;
    const pageSizeInt = parseInt(pageSize);

    try {
        const tracks = await Track.findAll({
            limit: pageSizeInt,
            offset: offset
        });

        console.log(tracks)
    
        const total = await Track.count();
    
        return res.status(200).json({
            data: tracks,
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            total: total
        });
    } catch (error) {
        console.error('Unable to retrieve tracks:', error);
        return res.status(500).json({
            message: 'Error retrieving tracks'
        });
    }    
}

export const createTrack = async (req, res) => {
    try {
        const {
            name,
            composer,
            milliseconds,
            bytes,
            unitPrice,
            album_id,
            genre_id,
            media_type_id
        } = req.body

        console.log(name,
            composer,
            milliseconds,
            bytes,
            unitPrice,
            album_id,
            genre_id,
            media_type_id)

        if (album_id) {
            const findAlbum = await Album.findByPk(album_id)
            if (!findAlbum) {
                return res.status(400).json({
                    ddata: null,
                    message: "Album does not exists"
                })
            }
        }

        if (genre_id) {
            const findGenre = await Genre.findByPk(genre_id)
            if (!findGenre) {
                return res.status(400).json({
                    data: null,
                    messaage: "Genre does not exists"
                })
            }
        }

        if (media_type_id) {
            const findMediaType = await MediaType.findByPk(media_type_id)
            if (!findMediaType) {
                return res.status(400).json({
                    data: null,
                    message: "Media type does not exists"
                })
            }
        }

        //New track
        const newTrack = new Track({
            name,
            composer,
            milliseconds,
            bytes,
            unitPrice,
            album_id,
            genre_id,
            media_type_id
        });
        
        const createdTrack = await newTrack.save();
        if (createdTrack) {
            return res.status(201).json({
                data: createdTrack,
                message: "Track created sucessfully"
            })
        } else {
            return res.status(400).json({
                data: null,
                message: "Some error when we tried to create the track"
            })
        }
    } catch (error) {
        return res.status(400).json({
            data: null,
            message: 'Something went wrong...'
        })
    }
}