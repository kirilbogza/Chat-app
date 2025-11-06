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
  const [userInput, setUserInput] = useState("");

  const connectionStatus = connected ? "Connected" : "Disconnected";

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("chat_everybody", (data: string) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat_everybody");
    };
  }, []);

  const emitEvent = () => {

    setMessages((prev) => [...prev, userInput]);

    socket.emit("chat_everybody", userInput);
    setUserInput("");
  };
  return (
    <>
      <Layout
        messages={messages}
        emitEvent={emitEvent}
        userInput={userInput}
        setUserInput={setUserInput}
      ></Layout>
    </>
  );
}

export default App;
