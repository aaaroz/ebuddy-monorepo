import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "../routes";
import errorMiddleware from "../middleware/errorMiddleware";
import { onRequest } from "firebase-functions/v2/https";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/v1", router);

app.use(errorMiddleware);

export const api = onRequest(app);
