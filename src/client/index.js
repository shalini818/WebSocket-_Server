const WebSocket = require("ws");
const { logActivity } = require("./utils");

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("Connected to the WebSocket server");
});

ws.on("message", (data) => {
  const update = JSON.parse(data);
  logActivity(`Received update: ${JSON.stringify(update)}`);
  // Handle the update here
});

ws.on("close", () => {
  console.log("Disconnected from the WebSocket server");
});

ws.on("error", (error) => {
  logActivity(`WebSocket error: ${error.message}`);
});
