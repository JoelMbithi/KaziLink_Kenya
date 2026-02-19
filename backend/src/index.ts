
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import businessRoutes from './routes/businessRoutes'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000



//middlewares
app.use(cors({
   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())


//routes

app.use('/api/business',businessRoutes)

app.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`);
});