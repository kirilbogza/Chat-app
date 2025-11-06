import { useState } from "react";

type LayoutProps = {
  messages: string[];
  emitEvent: () => void;
  userInput: string;
  setUserInput: (value: string) => void;
};

function Layout({ messages, emitEvent, userInput, setUserInput }: LayoutProps) {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [buttonUnactive, setButtonActive] = useState(false);

  function openSidebar() {
    setSideBarOpen((prev) => !prev);
    setButtonActive((prev) => !prev);
  }

  return (
    <>
      <header></header>
      <main className="app">
        {/* sidebar */}
        <div
          className="sidebar"
          style={{
            width: isSideBarOpen ? "300px" : "130px",
            justifyContent: isSideBarOpen ? "space-between" : "center",
            flexDirection: isSideBarOpen ? "row-reverse" : "row-reverse",
          }}
        >
          <button onClick={openSidebar} className="button-sidebar">
            {buttonUnactive ? "→ ←" : "← →"}
          </button>

          <div
            style={{
              display: isSideBarOpen ? "block" : "none",
            }}
          >
            <div className="container-chat-list">
              <p>chats</p>
              <p>________</p>
            </div>
          </div>
        </div>
        {/* container */}
        <div className="container-chat">
          <div className="container-message">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <img
                  src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-Transparent.png"
                  alt=""
                />
                <p>{message}</p>
              </div>
            ))}
          </div>
          <div className="container-input">
            <input
              type="text"
              placeholder="Write your message"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              className="button-submit"
              type="submit"
              title="none"
              onClick={emitEvent}
            ></button>
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
}

export default Layout;
