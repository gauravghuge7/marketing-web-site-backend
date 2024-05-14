import mongoose from 'mongoose';
import JWT from 'jsonwebtoken';


const otpSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        
        minLength: [10, 'mobile number must be 10 digits long'],
        maxLength: [15, 'mobile number only 15 digits long'],
    },

    otp: {
        type: Number,
        
        trim: true,
    }

});


otpSchema.methods = {

    
    createToken: async function () {

        return await JWT.sign(

            {id: this._id, mobile: this.mobile, ourReferralCode: this.ourReferralCode},
            process.env.JWT_SECRET,

            {
                expiresIn: "1d",
            }
        )
    }


}

export const Otp = mongoose.model('Otp', otpSchema);