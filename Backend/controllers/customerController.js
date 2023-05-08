import Customer from '../models/Customer.js';
import Employee from '../models/Employee.js'
import Register from '../models/Register.js'
import Invoice from '../models/Invoice.js'
import InvoiceItems from '../models/InvoiceLine.js'
import Track from '../models/Track.js'
import Genre from '../models/Genre.js'
import { register } from '../services/authService.js';
import Joi from 'joi'
import { sequelize } from '../configure-db.js'
import { QueryTypes } from 'sequelize';

const schemaRegister = Joi.object({
    firstName: Joi.string().min(4).max(100).required(),
    lastName: Joi.string().min(4).max(100).required(),
    phone: Joi.number().required(),
    email: Joi.string().min(4).max(100).required(),
    password: Joi.string().min(4).max(100).required(),
    // company: Joi.string().min(3).max(100).required(),
    // address: Joi.string().min(4).max(100).required(),
    // city: Joi.string().min(4).max(100).required(),
    // state: Joi.string().min(4).max(100).required(),
    // country: Joi.string().min(4).max(100).required(),
    // postalCode: Joi.number().required(),
    // fax: Joi.number().required(),
    // support_rep_id: Joi.number().required(),
})

export const getCustomers = async (req, res) => {
    await Customer.findAll().then(customers => {
        return res.status(200).json({
            data: customers
        })
    }).catch(error => {
        console.error('Unable to retrieve customers:', error);
    });
}

export const getCustomersServedByEmployee = async (req, res) => {
    try {
        const employeeId = req.query.employee
        Employee.findByPk(employeeId)
            .then(employee => {
                if (!employee) {
                    return res.status(404).json({
                        message: "Employee does not exists"
                    })
                } else {
                    const servedBy = Customer.findAll({
                        where: {
                            support_rep_id: employeeId
                        }
                    });
                    return res.status(200).json({
                        data: servedBy,
                        message: `Clients served by client ${employeeId}`
                    })
                }
                
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })
    }
}

export const getCustomersMusicGenre = async (req, res) => {
    const { params: { customer_id }, body } = req;

    const invoices = await Invoice.findAll({
        where: { customer_id },
        include: [{ model: Customer }]
    })

    const genreSet = new Set()
    await Promise.all(invoices.map(async (invoice) => {
        const invoice_items = await InvoiceItems.findAll({
            where: { invoice_id: invoice.id },
            include: [{ model: Track, include: [Genre] }]
        })

        await Promise.all(invoice_items.map(async (item) => {
            const track_id = item.dataValues.track_id
            const track = await Track.findByPk(track_id)
            const genre = track.dataValues.genre_id
        
            genreSet.add(genre)
        
        }))
    }))

    const genreArray = Array.from(genreSet)
    
    return res.status(200).json({
        data: genreArray,
        message: "Customer music genres"
    })
}

export const getAllTracksPurchasedByCustomer = async (req, res) => {
    try {
        const { params: { customer_id }, body } = req;

        const customer = await Customer.findByPk(customer_id)
        if (!customer) {
            return res.status(400).json({
                message: "Customer does not exists"
            })
        }

        const invoices = await Invoice.findAll({
            where: { customer_id },
            include: [{ model: Customer }]
        })

        const trackSet = new Set()
        await Promise.all(invoices.map(async (invoice) => {
            const invoice_items = await InvoiceItems.findAll({
                where: { invoice_id: invoice.id },
                include: [{ model: Track }]
            })
    
            await Promise.all(invoice_items.map(async (item) => {
                const track_id = item.dataValues.track_id
                const track = await Track.findByPk(track_id)
                trackSet.add(track);
            }))
        }))

        const tracksArray = Array.from(trackSet).map(track => track.dataValues)

        return res.status(200).json({
            data: tracksArray,
            message: "Customer tracks"
        })


    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

export const topCustomers = async (req, res) => {
    try {
        const topCustomers = await sequelize.query(`
            SELECT c.FirstName, c.LastName, SUM(ii.UnitPrice * ii.Quantity) AS TotalPurchaseValue
            FROM invoiceLine ii
            INNER JOIN invoice i ON ii.InvoiceId = i.InvoiceId
            INNER JOIN customer c ON i.CustomerId = c.CustomerId
            GROUP BY c.CustomerId
            ORDER BY TotalPurchaseValue DESC
            LIMIT 10
            `, {
                type: QueryTypes.SELECT,
                raw: true
        });
        console.log(topCustomers)
        return res.status(201).json({
            data: topCustomers
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}