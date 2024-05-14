import app from './src/app.js';
import connectDB from './src/database/database.js';
import dotenv from 'dotenv';

dotenv.config({
    path: "./.env"
})

const PORT = 5000 || process.env.PORT  ;

import Razorpay from 'razorpay';
const instance = new Razorpay({
    
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
    
});




connectDB()

.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})

.catch((error) => {

    console.log("Error in connecting the database ans connecting to express server", error);
    process.exit(1);
});


export {
    instance
}
