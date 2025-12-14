import mongoose from "mongoose";

export const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};