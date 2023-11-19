/* en este archivo solo se trabaja express */

import express from 'express'
import morgan from 'morgan'
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from './routes/auth.routes.js';
import taskRoutes from "./routes/tasks.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/images', express.static(path.join(__dirname, 'public/images/image_product')));
app.use('/images', express.static(path.join(__dirname, 'public/images/image_profile')));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cookieParser());


app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api', taskRoutes)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});



export default app;