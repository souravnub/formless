"use client";
import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "./main/page";
export default function Home() {
    const [showChat, setShowChat] = useState(false);
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    var socket: any;
    socket = io(`http://localhost:${process.env.NEXT_PUBLIC_PORT}`);

    const handleJoin = () => {
        if (username !== "" && roomId !== "") {
            console.log(username, "username", roomId, "roomid");
            socket.emit("join_room", roomId);
            setShowSpinner(true);
            setTimeout(() => {
                setShowChat(true);
                setShowSpinner(false);
            }, 2000);
        } else {
            alert("Please enter username and room id");
        }
    };
    return (
        <div>
            <div
                className={`${
                    showChat ? "hidden" : "flex h-screen w-screen flex-col items-center justify-center gap-4"
                }`}
            >
                <input
                    className="h-8 w-60 p-1"
                    type="text"
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={showSpinner}
                />
                <input
                    className="h-8 w-60 p-1"
                    type="text"
                    placeholder="Enter room id"
                    onChange={(e) => setRoomId(e.target.value)}
                    disabled={showSpinner}
                />
                <button className="h-8 w-60 items-center justify-center" onClick={handleJoin}>
                    {!showSpinner ? (
                        "join"
                    ) : (
                        <div className="border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full w-5 h-5 animate-spin"></div>
                    )}
                </button>
            </div>
            <div className={`${!showChat ? "hidden" : ""}`}>
                <ChatPage socket={socket} username={username} roomId={roomId} />
            </div>
        </div>
    );
}
