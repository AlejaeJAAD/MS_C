import jwt from "jsonwebtoken"
import tokenVerificationErrors from '../utils/tokenVerificationErrors.js'

const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies && req.cookies.refreshToken;
        if (!refreshTokenCookie) {
            return res.json({
                errorMessage: 'Token does not exists'
            })
        }

        try {
            const { id, exp } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH_SECRET);
            const now = Math.floor(Date.now() / 1000) // convert current time to Unix timestamp

            if (exp > now) {
                req.id = id
                next()
            } else {
                return res.json({
                    message: false
                })
            }
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return res.json({
                    message: "Not a valid token"
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({ error: tokenVerificationErrors[error.message] })
    }
}

export default requireRefreshToken