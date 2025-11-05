type LayoutProps = {
  connectionStatus: string;
  messages: string[];
};

function Layout({ connectionStatus, messages }: LayoutProps) {
  return (
    <div id="messages-container">
      <p>{connectionStatus}</p>

      {messages.map((message) => (
        <p>{message}</p>
      ))}
    </div>
  );
}

export default Layout;
