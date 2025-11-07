import { useState } from "react";

type LayoutProps = {
  messages: string[];
  emitEvent: () => void;
  userInput: string;
  setUserInput: (value: string) => void;
  username: string;
  connectionStatus: string;
};

export default function Layout({
  messages,
  emitEvent,
  userInput,
  setUserInput,
  username,
  connectionStatus,
}: LayoutProps) {
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  return (
    <>
      <header
        style={{
          height: "50px",
          background: "#d9d9d9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <h3>Chat App</h3>
        <p>
          @{username} – {connectionStatus}
        </p>
      </header>

      <main style={{ display: "flex" }}>
        {/* Sidebar */}
        <div
          style={{
            width: isSideBarOpen ? "200px" : "80px",
            background: "#d9d9d9",
            borderRight: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={() => setSideBarOpen(!isSideBarOpen)}>☰</button>
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, padding: "20px" }}>
          <div
            style={{
              height: "60vh",
              border: "1px solid gray",
              overflowY: "auto",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            {messages.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && emitEvent()}
              placeholder="Write your message..."
              style={{ flex: 1, padding: "10px" }}
            />
            <button onClick={emitEvent}>Send</button>
          </div>
        </div>
      </main>
    </>
  );
}
