import express from 'express'
import { getAllOrderController, getOrderController, orderStatusController, registerControllers, updateProfileController } from "../controllers/authControllers.js"
import { loginControllers } from '../controllers/authControllers.js';
import { testController } from './../controllers/authControllers.js';
import { forgotPasswordController } from '../controllers/authControllers.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
//routerobj

const router = express.Router();


// routing

router.post('/register', registerControllers);


//LOGIN ||POST
router.post('/login', loginControllers)


//forgot password
router.post('/forgotpassword', forgotPasswordController)

//test routes

router.get('/test', requireSignIn, isAdmin, testController)


// protectetd userroute auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})


router.put('/profile', requireSignIn, updateProfileController)
//admin proteted routes



router.get("/orders", requireSignIn, getOrderController)

router.get("/all-orders", requireSignIn, isAdmin, getAllOrderController)


router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)
export default router;