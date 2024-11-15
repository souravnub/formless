"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

export const NextAuthProvider = ({ children }: { children: ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

function registerOrUnRegisterUser(
    socket: Socket,
    eventType: "register" | "un-register",
    userRole: "ADMIN" | "SUPERVISOR" | "USER"
) {
    switch (userRole) {
        case "ADMIN":
            socket.emit(eventType, "admin");
            break;
        case "USER":
            socket.emit(eventType, "employee");
            break;
        case "SUPERVISOR":
            socket.emit(eventType, "supervisor");
            break;
        default:
            break;
    }
}

const SocketContext = createContext<Socket | null>(null);
export function SocketContextProvider({ children }: { children: ReactNode }) {
    const session = useSession();
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(
        function () {
            if (!session.data) return;

            const socketConnection = io(`http://localhost:${process.env.NEXT_PUBLIC_PORT}`);
            setSocket(socketConnection);

            const userRole = session.data.user.role;
            registerOrUnRegisterUser(socketConnection, "register", userRole);

            return () => {
                registerOrUnRegisterUser(socketConnection, "un-register", userRole);
                socketConnection.disconnect();
                setSocket(null);
            };
        },
        [session.data]
    );

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
export const useSocketContext = () => {
    const socket = useContext(SocketContext);
    return socket;
};
