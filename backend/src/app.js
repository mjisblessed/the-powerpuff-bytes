import express from 'express';
import http from 'http';
import { Server } from "socket.io";

// import { selectRoomSocket } from './controllers/roomAllocation/person.js';
// import { updateRoomSocket } from './controllers/roomAllocation/room.js';
// import { verifySocketToken } from './middleware/verifyToken.js';

import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profRoutes.js';
import notifsRoutes from './routes/notifsRoutes.js';
import forgotPassword from './routes/forgotPassword.js';

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
app.use("/api/notif",notifsRoutes);
app.use("/api/pass_reset",forgotPassword);


// // 🟢 SOCKET.IO FOR ROOM ALLOCATION

// io.use(verifySocketToken);
// io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id}`);
//     console.log(socket.user.sid);
//     console.log(socket.user.name);
    
//     // Listen for room allocation events
//     socket.on('roomUpdated', async (data, callback) => {
//         console.log("Room allocation data received:", data);
        
//         console.log(socket.user.sid);
//         console.log(socket.user.name);
//         // Add user data from the socket
//         data.sid = socket.user.sid;
//         data.name = socket.user.name;

//         try {
//             await updateRoomSocket(data, async (updateResponse) => {
//                 if (updateResponse.selected === false) {
//                     console.log("huh");
//                     callback(updateResponse);
//                     return;
//                 }

//                 console.log('Room update successful:', updateResponse);

//                 await selectRoomSocket(data, (selectResponse) => {
//                     console.log('Room selection successful:', selectResponse);
//                     callback(selectResponse);
//                     // console.log(selectResponse);

//                     io.emit('roomUpdated', { message: 'Room allocated successfully', data });
//                 });
//             });
//         } catch (error) {
//             console.error("Error handling room update:", error);
//             callback({ success: false, message: 'An error occurred while processing the request.' });
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log(`User disconnected: ${socket.id}`);
//     });
// });


// Start server
server.listen(5090, () => {
    connectDb();
    console.log("Server started at http://127.0.0.1:5090");
});
