import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
dotenv.config(); // PORT and MONGO URL in the .env folder

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true})); //for send over req
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})

// const CONNECTION_URL = 'mongodb+srv://admin:Abcd1234@cluster001.h7uda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));