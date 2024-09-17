import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./src/db/conn.js";
import userRoutes from "./src/routes/userRoute.js"
dotenv.config();
connectDb();

const app = express();

// Use express.json() middleware correctly
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/api/users', userRoutes);
// Routes
app.get("/", (req, res) => {
    res.send("First node js");
});





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});
