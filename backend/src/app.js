import express from 'express';
import http from 'http';
import { Server } from "socket.io";

import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profRoutes.js';
import forgotPassword from './routes/forgotPassword.js';
import path from "path";
import { fileURLToPath } from "url";
import postRoutes from "./routes/postRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";


import roleRoutes from './routes/roleRoutes.js';

dotenv.config();
console.log("MONGO URI: ", process.env.MONGO_URI);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
       // origin:"*",
        methods: ["GET", "POST", "PATCH"],
        credentials: true
    }
});

// Middleware
app.use(express.json()); 
app.use(cors( {
    origin: "http://localhost:5173",
    //origin:"*",
    methods: ["GET", "POST", "PATCH"],
    credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/check", roleRoutes);
app.use("/api/pass_reset",forgotPassword);
app.use("/posts", postRoutes);
app.use("/users", usersRoutes);


// Start server
server.listen(5090, () => {
    connectDb();
    console.log("Server started at http://127.0.0.1:5090");
});
