import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import router from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app=express();
const PORT=process.env.PORT || 8000

app.use(cors({
  orgin:"http://localhost:5173",
}))
app.use(express.json())
app.use(rateLimiter)
app.use("/api/notes",router);

connectDB().then(()=>{
app.listen(PORT,()=>{
  console.log(`Server started and running on port ${PORT}`);
});
})