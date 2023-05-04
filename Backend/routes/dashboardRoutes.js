import { Router } from 'express'
import { 
    dashboard,
} from '../controllers/dashboardController.js'
import requireToken from '../middlewares/requireToken.js'

const router = Router()

router.get("/", requireToken, dashboard)

export default router