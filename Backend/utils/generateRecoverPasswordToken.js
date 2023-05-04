import jwt from "jsonwebtoken"

const generateRecoverPasswordToken = (uid, email) => {
    const expiresInMinutes = 10
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes)

    try {
        const token = jwt.sign(
            { uid, email },
            process.env.JWT_RECOVER_PASSWORD, 
            { expiresIn: expiresInMinutes * 60 }
        )
        return { token, expiresIn: expiresAt.getTime() };
    } catch (err) {
        console.log(err)
    }
}

export default generateRecoverPasswordToken