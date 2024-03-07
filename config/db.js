import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.mongo_URI);
        console.log(`Db connected to ${conn.connection.host}`);
    } catch (error) {
        process.exit(1);
    }
}

export default connectDB;