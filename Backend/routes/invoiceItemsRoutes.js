import { Router } from 'express'
import { 
    getInvoiceItems,
    createInvoiceItem
} from '../controllers/invoiceItemsController.js'

const router = Router()

router.post("/", createInvoiceItem)
router.get("/", getInvoiceItems)

export default router