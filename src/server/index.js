const WebSocket = require("ws");
const { logActivity } = require("./utils");
const { generateOrderUpdates } = require("./updateHandler");

const PORT = 8080;
const server = new WebSocket.Server({ port: PORT });

server.on("connection", (socket) => {
  console.log("Client connected");

  // Send updates every second
  const updates = generateOrderUpdates();
  let index = 0;

  const intervalId = setInterval(() => {
    if (index < updates.length) {
      const update = updates[index++];
      socket.send(JSON.stringify(update));
      logActivity(`Update sent to client: ${JSON.stringify(update)}`);
    } else {
      clearInterval(intervalId);
    }
  }, 1000);

  socket.on("close", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (error) => {
    logActivity(`WebSocket error: ${error.message}`);
  });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
