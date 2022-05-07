import mongoose from 'mongoose';
import dotenv from "dotenv";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
    };
};

export default connectDB;