import { useState } from "react";

type LayoutProps = {
  connectionStatus: string;
  messages: string[];
};

function Layout({ connectionStatus, messages }: LayoutProps) {
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
        <div
          className="sidebar"
          style={{
            width: isSideBarOpen ? "300px" : "130px",
            justifyContent: isSideBarOpen ? "space-between" : "center",
            flexDirection: isSideBarOpen ? "row-reverse" : "row-reverse",
          }}
        >
          {/* <p>{connectionStatus}</p> */}

          <button onClick={openSidebar} className="button-sidebar">
            {buttonUnactive ? "→ ←" : "← →"}
          </button>
          <div
            style={{
              display: isSideBarOpen ? "block" : "none",
            }}
          >
            <div className="container-chats">
              <p>chats</p>
              <p>________</p>
            </div>
          </div>
        </div>
        <div className="container-chat">
          <div className="message">
            {messages.map((message) => (
              <p>{message}</p>
            ))}
          </div>
          <div className="container-input">
            <input type="text" placeholder="Write your message" />
            <button
              className="button-submit"
              type="submit"
              title="none"
            ></button>
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
}

export default Layout;
