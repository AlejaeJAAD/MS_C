import Genre from '../models/Genre.js'

export const getGenres = async (req, res) => {
    await Genre.findAll().then(genres => {
        return res.status(200).json({
            data: genres
        })
    }).catch(error => {
        console.error('Unable to retrieve genres:', error);
    });
}

export const createGenre = async (req, res) => {
    try {
        const { 
            name
        } = req.body

        //New genre
        const newGenre = new Genre({
            name
        });
        
        const createdGenre = await newGenre.save();
        if (createdGenre) {
            return res.status(201).json({
                data: createdGenre,
                message: "Genre created sucessfully"
            })
        } else {
            return res.status(400).json({
                data: null,
                message: "Some error when we tried to create the genre"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong...'
        })
    }
}