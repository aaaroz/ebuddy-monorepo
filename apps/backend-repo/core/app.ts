import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "../routes/userRoutes";

const app = express();
dotenv.config();
const port = process.env.APP_PORT ?? 3000;

app.use(express.json());
app.get("/", (_: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});
app.use("/v1", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
