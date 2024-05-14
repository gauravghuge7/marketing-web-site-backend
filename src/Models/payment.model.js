import mongoose from "mongoose";

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        trim: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,

    },

    razorpay_order_id: {
        type: String,
        required: true,
        trim: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
        default: "pending",
        trim: true,
    },

    razorpay_signature: {
        type: String,
        required: true,
        
        trim: true,
    },
  

}, { timestamps: true });    
 
export const Payment = mongoose.model("Payment", paymentSchema);