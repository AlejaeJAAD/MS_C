import InvoiceItems from '../models/InvoiceLine.js'
import Invoice from '../models/Invoice.js'
import Track from '../models/Track.js'

export const getInvoiceItems = async (req, res) => {
    await InvoiceItems.findAll().then(invoiceItems => {
        return res.status(200).json({
            data: invoiceItems
        })
    }).catch(error => {
        console.error('Unable to retrieve invoiceItems:', error);
    });
}

export const createInvoiceItem = async (req, res) => {
    try {
        const {
            unitPrice,
            quantity,
            invoice_id,
            track_id
        } = req.body

        if (invoice_id) {
            const invoice = await Invoice.findByPk(invoice_id)
            if (!invoice) {
                return res.status(400).json({
                    data: null,
                    message: "Invoice does not exists"
                })
            }
        }

        let unitPriceFromTrack = 0
        if (track_id) {
            const track = await Track.findByPk(track_id)
            if (!track) {
                return res.status(400).json({
                    data: null,
                    message: "Track does not exists"
                })
            }
        }

        //New invoice
        const newInvoiceItem = new InvoiceItems({
            unitPrice,
            quantity,
            invoice_id,
            track_id
        });
        
        const createdInvoiceItem = await newInvoiceItem.save();
        if (createdInvoiceItem) {
            return res.status(201).json({
                data: createdInvoiceItem,
                message: "Invoice Item created sucessfully"
            })
        } else {
            return res.status(400).json({
                data: null,
                message: "Some error when we tried to create the invoice item"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong...'
        })
    }
}