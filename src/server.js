import express from 'express';
import mongoose from 'mongoose';
import listEndpoints from "express-list-endpoints"

import BlogsRouter from "./services/blogs/blog-posts.js"


const server = express();


server.use(express.json());


server.use("/blogs", BlogsRouter)



const port = process.env.PORT;

mongoose.connect(process.env.MONGO_CONNECTION)


mongoose.connection.on('connected', () => {
    server.listen(port, () => {
        console.table(listEndpoints(server));
    })
})