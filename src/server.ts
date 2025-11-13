import app from "./app";
import { prisma } from "./prisma";

const PORT = Number(process.env.PORT) || 4000;

async function main() {
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🚀`);
  });

  const shutdown = async () => {
    console.log("Shutting down...🚩🚩🚩");
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  // process.on(...) catches termination signals to gracefully shut down
  process.on("SIGINT", shutdown); // Signal Interrupt for ctrl+c on terminal
  process.on("SIGTERM", shutdown); // Signal Terminate for kill command
}

// Start the server by calling main() and handle uncaught errors
main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect(); // Ensure DB disconnect on error
  process.exit(1);
});
