import { Router } from 'express'
import { 
    getEmployees,
    createEmployee,
    updateEmployee,
    getEmployeeSubordinates
} from '../controllers/employeeController.js'

const router = Router()

router.post("/", createEmployee)
router.get("/", getEmployees)
router.put("/:id", updateEmployee)
router.get("/:id", getEmployeeSubordinates)

export default router