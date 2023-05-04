import jwt from "jsonwebtoken"

const generateRefreshToken = (uid, res) => {
    try {
        const expiresIn = 60 * 60 * 24 * 30
        const refreshToken = jwt.sign(
            { uid },
            process.env.JWT_REFRESH_SECRET, 
            {expiresIn}
        )

        res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        res.cookie("refreshToken", refreshToken, {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + expiresIn * 1000),
            path: '/'
        });
        
    } catch (err) {
        console.log(err)
    }
}

export default generateRefreshToken