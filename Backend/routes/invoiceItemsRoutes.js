import { Router } from 'express'
import { 
    getInvoiceItems,
    createInvoiceItem
} from '../controllers/invoiceItemsController.js'

const router = Router()

router.get("/", getInvoiceItems)
router.post("/", createInvoiceItem)

export default router