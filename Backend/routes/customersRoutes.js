import { Router } from 'express'
import { 
    createCustomer,
    getCustomers,
    getCustomersServedByEmployee,
    getCustomersMusicGenre,
    getAllTracksPurchasedByCustomer
} from '../controllers/customerController.js'

const router = Router()

router.post("/", createCustomer)
router.get("/get", getCustomers)
router.get("/", getCustomersServedByEmployee)
router.get("/:customer_id/genres", getCustomersMusicGenre)
router.get("/:customer_id/tracks", getAllTracksPurchasedByCustomer)

export default router