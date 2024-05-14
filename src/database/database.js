import mongoose from 'mongoose';


const connectDB = async () => {
    try {

       const connection = await mongoose.connect(`${process.env.MONGO_URL}`);

       console.log(`Connected to MongoDB at ${connection.connection.host}`);

    } 
    catch (error) {
       
        console.log("Error in connecting the mongoDB database", error);
        process.exit(1);
    }
}

export default connectDB;