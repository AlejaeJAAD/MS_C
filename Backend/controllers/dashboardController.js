import Register from '../models/Register.js'
import Customer from '../models/Customer.js'
import Employee from '../models/Employee.js'
import { sequelize } from '../configure-db.js'
import { QueryTypes } from 'sequelize';

export const dashboard = async (req, res) => {
    try {
        const { email } = await Register.findOne({ where: { id: req.id } });
        
        const userType = await sequelize.query(
            `SELECT c.*, e.* 
            FROM Customer c 
            LEFT JOIN Employee e 
            ON c.email = e.email 
            WHERE c.email = :email OR e.email = :email`,
            {
                replacements: { email },
                type: QueryTypes.SELECT,
                raw: true
            }
        );

        if (userType.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        let fullInfo;

        if (userType[0].customerid) {
            fullInfo = await Customer.findOne({ where: { email } });
        } else if (userType[0].employeeid) {
            fullInfo = await Employee.findOne({ where: { email } });
        } else {
            throw new Error("User type not found");
        }

        if (!fullInfo) {
            throw new Error("User not found");
        }

        return res.status(200).json({ fullInfo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
