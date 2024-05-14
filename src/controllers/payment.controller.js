import { instance } from '../../index.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import crypto from 'crypto';
import {Payment} from '../Models/payment.model.js';



const createPayment = asyncHandler(async (req, res) => {
    
    try {
        const options = {

            amount: Number(req.body.amount * 100 || 2000 * 100),
            currency: 'INR',
    
            
        }
    
        const order = await instance.orders.create(options);
    
        console.log(order);
        return res.status(200)
        .json({ 
            success: true,
            order
        });
        
    } 

    catch (error) {
        console.log("Error is => ", error);
        throw new ApiError(400, "Error in creating payment");
    }
})

// const paymentVerification = asyncHandler(async (req, res) => {
    
//     try {
        
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//         // console.log(req.body);

//         const body = razorpay_order_id + "|" + razorpay_payment_id;

//         const expected_signature = crypto
//             .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//             .update(body.toString())
//             .digest('hex');
//             console.log(expected_signature);
//             console.log(razorpay_signature);

//             const isValid = expected_signature === razorpay_signature;
            
//             if (isValid) {
//                 const payment = await Payment.create({
//                     razorpay_order_id,
//                     razorpay_payment_id, 
//                     razorpay_signature
//                 })
    
//                 await payment.save();
            
//                 res.redirect(`http://localhost:5173/Dashboard`)
//                 res.status(200)
//                 .json({ 
//                 success: true,
//                 payment
//                 });
//             }

//             else {
//                 throw new ApiError(400, "Invalid signature");
//             }

            
        
//     } 

//     catch (error) {
//         console.log("Error is => ", error);
//         throw new ApiError(400, "Error in creating payment");
//     }
// })


 const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      // Database comes here
  
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      res.redirect(
        `http://localhost:5173//paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  };


export {
    createPayment,
    paymentVerification
}