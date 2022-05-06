import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from "./src/config/dbConnection.js";
import storeRouter from "./src/routes/storeRouter.js";
// import contentRouter from "./src/routes/contentRouter.js";
import errorHandler from "./src/middlewares/errorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 6001;

connectDB();

const app = express();

app.use(express.json());

app.use(cors());
app.options('*', cors())


app.use("/store", storeRouter);


app.use(errorHandler);

// Connect to MongoDb
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT || 8080, () => {
    console.log(`API server is running on port ${PORT}`);
  });
});