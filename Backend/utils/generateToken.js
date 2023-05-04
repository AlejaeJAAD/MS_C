import jwt from "jsonwebtoken"

const generateToken = (uid) => {
    const expiresIn = 60 * 15
    try {
        const token = jwt.sign(
            { uid }, 
            process.env.JWT_SECRET, 
            { expiresIn }
        )
        return { token, expiresIn };
    } catch (err) {
        console.log(err)
    }
}

export default generateToken;