import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config()

app.use(express.json({ limit: "6mb", extended: true }));
app.use(express.urlencoded({ limit: "6mb", extended: true }))
app.use(cors());

app.get('/', (req, res) => {
    res.json(
        {
            author: 'by kubilaycakmak',
            message: 'healthly'
        }
    )
});

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port : ${PORT}`)
        })
    })
    .catch((error) => {
        console.error(error.message)
    })
