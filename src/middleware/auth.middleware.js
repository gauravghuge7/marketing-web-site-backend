import JWT from "jsonwebtoken";
import {ApiError} from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isLoggedIn = asyncHandler(async(req, res, next) => {
    
    const token = req.cookies.token;

    
    if (!token) {
        throw new ApiError(400, 'No token found in cookie');
    }


    const userdetail = await JWT.verify(token, process.env.JWT_SECRET);
    



    req.user = userdetail;
    
    
    if (req.user) {

        res.redirect('/dashboard');
        return;
        next();
    } 
    else {

        res.redirect('/login');
        res.status(400).json({ 
            success: false,
            message: "User not logged in"
        });
    }

});


export default isLoggedIn;