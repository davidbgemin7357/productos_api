import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        connected
            ? console.log("Database connected")
            : console.log("Could no connect to the database");
    } catch (error) {
        console.log(error);
        throw new Error("Error during the process");
    }
};