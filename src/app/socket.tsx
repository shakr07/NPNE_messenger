import { io } from "socket.io-client";
        // Creating the socket connection
        const socketInstance = io("http://localhost:4000");

        export default socketInstance
