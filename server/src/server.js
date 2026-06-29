const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./config/database");

async function startServer() {
  try {
    await connectDatabase();

    const server = app.listen(env.port, () => {
      console.log(`Server started on port ${env.port}`);
    });

    server.on("error", (error) => {
      console.error("Server failed:", error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
