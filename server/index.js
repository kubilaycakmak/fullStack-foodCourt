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


mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port : ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.error(error.message)
    })
