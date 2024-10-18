import express from "express";
import dotenv from "dotenv";
import bodyParser from'body-parser'
import morgan from "morgan";
import cors from "cors";
import connectDb from "./src/db/conn.js";
import userRoutes from "./src/routes/userRoute.js"
import skillRoutes from "./src/routes/skillRoute.js"
import educationRoutes from "./src/routes/educationRoute.js"
import certificateRoutes from "./src/routes/certificateRoutes.js"
import projectRoutes from "./src/routes/projectRoute.js"
import experienceRoutes from "./src/routes/experienceRoute.js"
import languageRoutes from "./src/routes/languageRoutes.js"
import contactRoutes from "./src/routes/contactRoutes.js"
import BlogRoutes from "./src/routes/BlogRoute.js"
import logoRoutes from "./src/routes/logoRoutes.js"

dotenv.config();
connectDb();

const app = express();

app.use(bodyParser.json()); // For JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/educations', educationRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/contactme', contactRoutes);
app.use('/api/logo', logoRoutes);
app.use('/api/blogs', BlogRoutes);






const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});
