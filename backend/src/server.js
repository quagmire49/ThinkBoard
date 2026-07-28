import express from "express"
import router from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv"

dotenv.config();

const app=express();
const PORT=process.env.PORT || 8000

app.use(express.json())
app.use("/api/notes",router);

app.listen(PORT,()=>{
  connectDB();
  console.log(`Server started and running on port ${PORT}`);
});