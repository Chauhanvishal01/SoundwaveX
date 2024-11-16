import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connect to MONGODB Database`);
  } catch (error) {
    console.log("Failed to connect to MONGODB", error);
    process.exit(1);
  }
};
