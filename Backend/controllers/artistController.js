import Artist from '../models/Artist.js'

export const getArtists = async (req, res) => {
    await Artist.findAll().then(artists => {
        return res.status(200).json({
            data: artists
        })
    }).catch(error => {
        console.error('Unable to retrieve media artists:', error);
    });
}

export const createArtist = async (req, res) => {
    try {
        const { 
            name
        } = req.body

        //New media type
        const newArtist = new Artist({
            name
        });
        
        const createdArtist = await newArtist.save();
        if (createdArtist) {
            return res.status(201).json({
                data: createdArtist,
                message: "Artist created sucessfully"
            })
        } else {
            return res.status(400).json({
                data: null,
                message: "Some error when we tried to create the artist"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong...'
        })
    }
}