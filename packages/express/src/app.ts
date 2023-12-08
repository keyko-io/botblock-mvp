import axios from "axios";
import cors from "cors";
import express from "express";
import robotTxtRoutes from './routes/robotsTxtRoutes';
import healthRoutes from "./routes/healthRoutes";

const app = express();

app.use(cors());
app.use("/", healthRoutes)
app.use("/", robotTxtRoutes)

export default app;


