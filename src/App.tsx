import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Layout from "./Layout";

const socket = io("wss://api.leetcode.se/", {
  path: "/fos25",
});

function App() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const connectionStatus = connected ? "Connected" : "Disconnected";

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("chat_room", (data: string) => {
      console.log("Data received: ", data);

      setMessages((prev) => [...prev, JSON.stringify(data)]);

      console.log(messages);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat_room");
    };
  }, []);

  const emitEvent = () => {
    const message = {
      message: "Hej där",
      sender: "Ahmad ardal",
    };

    const stringifiedMessage = JSON.stringify(message);

    socket.emit("chat_room", stringifiedMessage);
  };
  return (
    <>
      <Layout connectionStatus={connectionStatus} messages={messages}></Layout>
    </>
  );
}

export default App;
