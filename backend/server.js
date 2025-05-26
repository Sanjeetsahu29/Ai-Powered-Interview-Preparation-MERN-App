import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import { protect } from './middlewares/authMiddleware.js';
import { generateInterviewQuestions, generateConceptExplanation } from './controllers/aiController.js';
dotenv.config();

const app = express();

//Middleware to handle cors
app.use(
    cors({
        origin:"*",
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)


//Middleware
app.use(express.json())

// Setup __dirname manually for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions",sessionRoutes);
app.use("/api/questions",questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions)
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation)

//Serve upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}))

//start server
const PORT  = process.env.PORT || 3000;
app.listen(PORT, async()=>{
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
    
})