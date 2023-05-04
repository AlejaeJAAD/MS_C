import Invoice from '../models/Invoice.js'
import Customer from '../models/Customer.js'

export const getInvoices = async (req, res) => {
    await Invoice.findAll().then(invoices => {
        return res.status(200).json({
            data: invoices
        })
    }).catch(error => {
        console.error('Unable to retrieve invoices:', error);
    });
}

export const createInvoice = async (req, res) => {
    try {
        const {
            customer_id,
            billingAddress,
            billingCity
        } = req.body

        if (customer_id) {
            const customer = await Customer.findByPk(customer_id)

            if (!customer) {
                return res.status(200).json({
                    data: null,
                    message: "Customer does not exists"
                })
            }
        }

        //New invoice
        const newInvoice = new Invoice({
            customer_id,
            invoiceDate: new Date(),
            billingAddress,
            billingCity
        });
        
        const createdInvoice = await newInvoice.save();

        if (createdInvoice) {
            return res.status(201).json({
                data: createdInvoice,
                message: "Invoice created sucessfully"
            })
        } else {
            return res.status(400).json({
                data: null,
                message: "Some error when we tried to create the invoice"
            })
        }
    } catch (error) {
        console.error(error); // add this line
        return res.status(500).json({
            message: 'Something went wrong...'
        })
    }
}