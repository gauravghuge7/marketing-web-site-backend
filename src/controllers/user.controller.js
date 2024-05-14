import { User } from '../Models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import createReferral from '../Helpers/generate.referral.js';

import { client } from '../app.js';
import { Otp } from '../Models/otp.schema.js';




    // cookies options 
    const cookieOptions = {
        maxAge: process.env.JWT_EXPIRES,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    }

    const generateOtp = async () => {
        return Math.floor(10000 + Math.random() * 9000);
    }


const registerUser = asyncHandler(async (req, res) => {
    try {
        // get the mobile number from the request body
        let { phoneNumber , referralCode } = req.body;
    
        // mobile number validation 
        if (!phoneNumber) {
        return res
            .status(400)
            .json(new ApiError(400, "mobile number is required"));
        }
    
        if (!phoneNumber.match(/^\d{10}$/)) {
        throw new ApiError(400, "mobile number must be 10 digits long", phoneNumber);
        }
    
        phoneNumber = `+91${phoneNumber}`;
    
        // generate otp for the user
        const otp = await generateOtp();
        console.log(phoneNumber);
        console.log(otp);
    

        // here find by mobile number and update otp with new otp

        let otpDoc;
        const findOtp = await Otp.findOne({mobileNumber: phoneNumber});

        if (findOtp) {
        otpDoc = await Otp.findOneAndUpdate(
            { _id: findOtp._id }, // filter
            { otp }, // update
        
            { new: true } // return updated document
        );
        } 
        else {
            otpDoc = await Otp.create({
                mobileNumber: phoneNumber,
                otp
            });
            await otpDoc.save();
        }
    
        // send otp to the user
        const sendOtp = await client.messages
        .create({
            body: `Your OTP is ${otp}`,
            to: phoneNumber,
            from: "+13852066791",
        })
        .catch((error) => {
            res.status(500);
            res.json({
            status: "error",
            message: error.message,
            });
        });
    

        const existedUser = await User.findOne({ phoneNumber });
    
        let ourReferralCode = "";
    
        if (!existedUser) {
            ourReferralCode = createReferral();
    
        const user = await User.create({
            phoneNumber,
            ourReferralCode,
            acceptReferralCode: referralCode,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    
        await user.save();
        }
    

        return res
        .status(200)
        .json({
            success: true,
            message: "OTP sent successfully",
            send: "user registered successfully",
        })
       

    } catch (error) {
        console.log("Error is => ", error.message);
    
        return res
        .status(500)
        .json({
            status: "error",
            message: error.message,
        });
    }
});



const verifyOtp = asyncHandler(async (req, res) => {

    try {
        let { mobileNumber, otp } = req.body;
    
        mobileNumber = `+91${mobileNumber}`;
        
        console.log(mobileNumber);
    
        const otpDoc = await Otp.findOne({ mobileNumber }).select("otp");
       
        console.log(otpDoc);

        const thisOtp = otpDoc.otp;

        console.log(thisOtp);
       

    
        if (!otpDoc) {
            return res
            .status(400)
            .json(new ApiResponse(400, "OTP not found for this mobile number"));
        }
    
        if (thisOtp == otp) {

            
            const token = otpDoc.createToken();

            await otpDoc.deleteOne({otp});

            return res
            .cookie('token', token, cookieOptions)
            .status(200)
            
            .json(new ApiResponse(200, "OTP verified successfully"));
        } 
        else {
            return res
            .status(400)
            .json(new ApiResponse(400, "Invalid OTP"));
        }

    } 
    catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            status: "error",
            message: error.message,
        });
    }
  });


const getUser = asyncHandler(async (req, res) => {

    try {
        // read the token from the cookie
        
       const {id} = req.user;

       // find token in the database by id
       
       const user = await User.findById(id);

       if(!user) {
           throw new ApiError(400, "User not found");
       }



        
        return res
        .status(200)
        .json(new ApiResponse(200, "User fetched successfully", user))

    }

    catch (error) {
        console.log("Error is => ", error);
        return new ApiError(400, "Error in getting user")
    }
});




export {
    registerUser,
    verifyOtp,
    getUser
}