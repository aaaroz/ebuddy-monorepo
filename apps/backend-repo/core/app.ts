import express from "express";
import dotenv from "dotenv";
import router from "../routes";
import { authMiddleware } from "../middleware/authMiddleware";
import { errorMiddleware } from "../middleware/errorMiddleware";

dotenv.config();
const app = express();
const port = process.env.APP_PORT ?? 3000;

app.use(express.json());

app.use(errorMiddleware)
app.use(authMiddleware)
app.use("/v1", router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
