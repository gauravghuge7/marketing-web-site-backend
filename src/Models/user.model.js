import mongoose from 'mongoose';
import JWT from 'jsonwebtoken';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    phoneNumber: {
        type: String,
        
        minLength: [10, 'mobile number must be 10 digits long'],
        maxLength: [15, 'mobile number only 15 digits long'],

    },

    ourReferralCode: {
        type: String,
        trim: true,
    },

    acceptReferralCode: {
        type: String,
    
        trim: true,
    },

    mobileNumber: {
        type: String,
        
        minLength: [10, 'mobile number must be 10 digits long'],
        maxLength: [15, 'mobile number only 15 digits long'],
    },

    otp: {
        type: String,
        
        trim: true,
    }

    




}, { timestamps: true });


userSchema.methods = {

    
    generateToken: async function () {

        return await JWT.sign(

            {id: this._id, mobile: this.mobile, ourReferralCode: this.ourReferralCode},
            process.env.JWT_SECRET,

            {
                expiresIn: "1d",
            }
        )
    }


}

export const User = mongoose.model('User', userSchema);