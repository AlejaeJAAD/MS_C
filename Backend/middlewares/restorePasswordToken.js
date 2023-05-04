import jwt from "jsonwebtoken"
import tokenVerificationErrors from '../utils/tokenVerificationErrors.js'

const restorePasswordToken = (token) => {
    let result;
    try {
        result = jwt.verify(token, process.env.JWT_RECOVER_PASSWORD)
        return result
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return {
                error: 'Token has expired. Please request a new password reset email.'
            }
        } else {
            console.log(error);
            return error
        }
    }
}

export default restorePasswordToken