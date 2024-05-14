




// import axios from 'axios';

// // Function to generate OTP
// function generateOTP() {
//     return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit OTP
// }


// // Function to send OTP via Form2SMS API
// async function sendOTP(phoneNumber, otp) {
    
//     const API_KEY = process.env.SMS_API_KEY;
//     const SENDER_ID = '7588643146';

//     const message = `Your OTP for verification is: ${otp}`;

//     try {
//         const response = await axios.post('https://api.form2sms.com/api/v1/send', {
//             to: phoneNumber,
//             sender: SENDER_ID,
//             message: message,
//             api_key: API_KEY
//         });

//         if (response.data.status === 'success') {
//             console.log('OTP sent successfully!');
//         } else {
//             console.error('Failed to send OTP:', response.data.message);
//         }
//     } catch (error) {
//         console.error('Error sending OTP:', error.message);
//     }
// }

// // Example usage
// const phoneNumber = '8767482793';
// const otp = generateOTP();

// sendOTP(phoneNumber, otp);



