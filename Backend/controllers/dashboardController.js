import Register from '../models/Register.js'
import Employee from '../models/Employee.js'
import Customer from '../models/Customer.js'

export const dashboard = async (req, res) => {
    try {
        const user = await Register.findByPk(req.uid)
        delete user.dataValues.password;

        const fullInfo = await Customer.findByPk(user.dataValues.uid)
        if (!fullInfo) {
            return res.status(200).json({
                message: 'Youre not a customer!.'
            })
        }
        
        return res.status(200).json({
            fullInfo: fullInfo,
        })
    } catch (error) {
        return res.status(500).json({ error: "Some error with the server"})
    }
}