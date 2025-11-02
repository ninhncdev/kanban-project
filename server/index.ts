/** @format */

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./src/routers/user";
import storageRoute from "./src/routers/product";
import cors from "cors";
import { verifyToken } from "./src/middleware/verifylToken";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.bw4ardn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use("/auth", userRoute);

app.use(verifyToken);
app.use("/storage", storageRoute);
console.log(process.env.DATABASE_PASSWORD);
app.get("/logs", async (req, res) => {
  const { page, limit } = req.query;
  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 20;
});

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log(`Connect to db successfully!!!`);
  } catch (error) {
    console.log(`Can not connect to db ${error}`);
  }
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is stating at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
