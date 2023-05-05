import { Router } from 'express'
import { 
    register,
    login,
    forgotPassword,
    confirmForgotPassword,
    logout,
    refreshToken
} from '../controllers/authController.js'
import requireRefreshToken from '../middlewares/requireRefreshToken.js'

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/confirm-forgot-password", confirmForgotPassword)
router.post("/logout", logout)
router.get("/refreshToken", requireRefreshToken, refreshToken)

export default router