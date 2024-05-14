import express from 'express';
import userRouter from './Routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use(cookieParser());
app.use(cors());


      /// check server is running or not
    app.get('/', ( req, res ) => {
        res.send('Hello World!');
    });


    app.use('/user', userRouter);



      /// get additional information to client
app.get('/api/getkey', (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

app.get('/user/twalio', () => {
    res.status(200).json({
        sid: process.env.TWILIO_ACCOUNT_SID,
        token: process.env.TWILIO_AUTH_TOKEN,
        number: process.env.TWILIO_PHONE_NUMBER,
    })
}) 



    

    const TWILIO_ACCOUNT_SID = accountSid;
    const TWILIO_AUTH_TOKEN = authToken;

    import twilio from 'twilio';
    export const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
   
    // import sendRouter from './Routes/sendOtp.route.js';

    // app.use('/', sendRouter)
    
















    // history router get all history
    import historyRouter from './Routes/history.routes.js';
    import { accountSid, authToken } from './Helpers/twilio.keys.js';
    
    app.use('/history', historyRouter);















// this for other any request on server
app.get('*', (req, res) => {
    res.status(404).send('Web page Not found in this domain');
});


export default app;
