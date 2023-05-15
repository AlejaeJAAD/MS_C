import { Router } from 'express'
import { 
    register,
    login,
    forgotPassword,
    confirmForgotPassword,
    changePassword,
    logout,
    refreshToken,
    getUserData
} from '../controllers/authController.js'
import requireRefreshToken from '../middlewares/requireRefreshToken.js'
import requireToken from '../middlewares/requireToken.js'

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/confirm-forgot-password", confirmForgotPassword)
router.put("/change-password", requireToken, changePassword)
router.post("/logout", logout)
router.get("/refreshToken", requireRefreshToken, refreshToken)
router.get("/getUserData", requireToken, getUserData)

export default router