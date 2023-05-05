import { Router } from 'express'
import { 
    getInvoices,
    createInvoice
} from '../controllers/invoiceController.js'

const router = Router()

router.post("/", createInvoice)
router.get("/", getInvoices)

export default router