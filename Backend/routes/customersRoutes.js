import { Router } from 'express'
import { 
    getCustomers,
    getCustomersServedByEmployee,
    getCustomersMusicGenre,
    getAllTracksPurchasedByCustomer,
    topCustomers
} from '../controllers/customerController.js'

const router = Router()

router.get("/", getCustomers)
router.get("/", getCustomersServedByEmployee)
router.get("/:customer_id/genres", getCustomersMusicGenre)
router.get("/:customer_id/tracks", getAllTracksPurchasedByCustomer)
router.get("/top-customers", topCustomers)

export default router