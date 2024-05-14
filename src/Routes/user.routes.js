import { Router } from "express";
const userRouter = Router();

// import methods from controllers

import { registerUser, verifyOtp } from '../controllers/user.controller.js';

// import {getHistory} from '../controllers/admin.controller.js';
// import isLoggedIn from "../middleware/auth.middleware.js";

// import { createPayment, paymentVerification } from "../controllers/payment.controller.js";



    // accept form data from user
    import multer from 'multer';
    const upload = multer();





    userRouter.route('/register').post(upload.none(), registerUser);
    userRouter.route('/verify').post(upload.none(), verifyOtp);

    // get info from user 

    // userRouter.route('/dashboard').get(isLoggedIn, getUser);

    // userRouter.route('/history').get(isLoggedIn, getHistory);


        // payment routes
    // userRouter.route('/payment').post(createPayment);

    // userRouter.route('/paymentverification').post(paymentVerification);











   
export default userRouter;