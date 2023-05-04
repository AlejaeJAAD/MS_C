import MediaTypes from '../models/MediaTypes.js'

export const getMediaTypes = async (req, res) => {
    await MediaTypes.findAll().then(mediaTypes => {
        return res.status(200).json({
            data: mediaTypes
        })
    }).catch(error => {
        console.error('Unable to retrieve media types:', error);
    });
}

export const createMediaTypes = async (req, res) => {
    try {
        const { 
            name
        } = req.body

        //New media type
        const newMediaType = new MediaTypes({
            name
        });
        
        const createdMediaType = await newMediaType.save();
        if (createdMediaType) {
            return res.status(201).json({
                data: createdMediaType,
                message: "Media type created sucessfully"
            })
        } else {
            return res.status(400).json({
                data: null,
                message: "Some error when we tried to create the media type"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong...'
        })
    }
}