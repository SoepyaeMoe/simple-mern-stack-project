import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ProductRouter from "./routes/product.route.js";
import path from 'path';

const __dirname = path.resolve();

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json()); //allow us to accept json data in the req.body

app.use("/api/products", ProductRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});