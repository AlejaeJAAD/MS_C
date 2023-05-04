import { Router } from 'express'
import { 
    getEmployees,
    createEmployee,
    updateEmployee,
    getEmployeeSubordinates
} from '../controllers/employeeController.js'

const router = Router()

router.get("/", getEmployees)
router.post("/", createEmployee)
router.put("/:id", updateEmployee)
router.get("/:id", getEmployeeSubordinates)

export default router