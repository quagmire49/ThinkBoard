import mongoose from "mongoose"

const connectDB=async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("ERROR connecting to MONGODB",error);
    process.exit(1);
  }
}

export default connectDB;