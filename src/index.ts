// src/index.ts

import dotenv from "dotenv";
import { startServer } from "./server/app.ts";

dotenv.config();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
startServer(PORT);
