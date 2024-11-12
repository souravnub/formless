"use client"
import React, {useEffect, useState} from 'react';

interface IMsgDataTypes {
    roomId: string | number;
    user: string;
    message: string;
    timestamp: string;
}

const ChatPage = ({socket, username, roomId}:any) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [chat, setChat] = useState<IMsgDataTypes[]>([]);

    const sendData = async (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        if(currentMessage !== ""){
            const messageData: IMsgDataTypes = {
                roomId,
                user:username,
                message:currentMessage,
                timestamp: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", messageData);
            setCurrentMessage("");
        }
    };
    useEffect(()=>{
        socket.on("receive_message", (data:IMsgDataTypes)=>{
            setChat((pre)=>[...pre, data]);
        });
    },[socket]);
    return (
        <div className="flex h-screen w-screen flex-col item-center justify-center">
            <div className="border border-red-500 p-1.5">
                <div className="mb-4">
                    <p>
                        Name: <b>{username}</b> and Room Id: <b>{roomId}</b>
                    </p>
                </div>
                <div>
                {chat.map(({message, roomId, user,timestamp},index)=>(
                    <div 
                    key={index}
                        className={`flex items-center mb-1.5 gap-1.5 ${
                            user === username ?"flex-row-reverse" : ""
                        }`}
                        >
                        <span
                        className='flex items-center justify-center h-8 w-8 rounded-full border border-white bg-[#d5d5b6] text-black'
                        style={{textAlign: user=== username? "left" :"right"}}
                        >
                            {user.charAt(0)}
                            </span>
                            <h3 className='text-left'>{message}</h3>
                    </div>
                ))}
                </div>
            <div>
            <form onSubmit={(e) => sendData(e)} className="flex gap=2 mt-2">
                <input
                    type="text"
                    value={currentMessage}
                    onChange={(e)=>setCurrentMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="h-8 w-60 p-1"
                />
                <button type="submit" className="px-4 bg-blue-500 text-white rounded">
                    Send
                </button>
            </form>
            </div>
        </div>
        </div>
    );
}

export default ChatPage;