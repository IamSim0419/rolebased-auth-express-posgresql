import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/auth.route";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/", (_req, res) => res.send("Community API up ☑️"));

export default app;
