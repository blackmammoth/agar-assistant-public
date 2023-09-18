import mongoose from "mongoose";

let isConnected = false // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "agar_assistant",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true;

        console.log('MongoDB Connected!')
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        throw error; // Rethrow the error to let the caller handle it
    }

}