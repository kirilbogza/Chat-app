import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Username from "./Username";

const socket = io("wss://api.leetcode.se/", { path: "/fos25" });

function RequireUsername(props: { username: string; children: ReactNode }) {
  if (!props.username) {
    return <Navigate to="/start" replace />;
  }
  return <>{props.children}</>;
}

function App() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") ?? ""
  );

  useEffect(() => {
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("chat_everybody", (data: string) =>
      setMessages((prev) => [...prev, data])
    );
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat_everybody");
    };
  }, []);

  const emitEvent = () => {
    const text = userInput.trim();
    if (!text || !username) return;
    const msg = `${username}: ${text}`;
    setMessages((prev) => [...prev, msg]);
    socket.emit("chat_everybody", msg);
    setUserInput("");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={username ? "/chat" : "/start"} replace />}
        />
        <Route path="/start" element={<Username setUsername={setUsername} />} />
        <Route
          path="/chat"
          element={
            <RequireUsername username={username}>
              <Layout
                messages={messages}
                emitEvent={emitEvent}
                userInput={userInput}
                setUserInput={setUserInput}
                username={username}
                connectionStatus={connected ? "Connected" : "Disconnected"}
              />
            </RequireUsername>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
