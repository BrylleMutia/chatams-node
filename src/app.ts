import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter } from "./router/authRouter.js";
import { clientRouter } from "./router/clientRouter.js";
import { categoryRouter } from "./router/categoryRouter.js";
import { chatRouter } from "./router/chatRouter.js";
import { initializeRoles } from "./seeders/roleSeeder.js";
import { initializeClients } from "./seeders/clientSeeder.js";

dotenv.config();

export const MONGO_URI = `mongodb+srv://bryllemutia:${process.env.MONGO_PASSWORD}@cluster0.qt8cm1e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// you can explicitly annotate the types, but is not required
const initializeApp = () => {
   const app = express();

   app.use(cors({ credentials: true }));
   app.use(compression()); // will attempt to compress response bodies for all request
   app.use(cookieParser()); // parse Cookie header and populate req.cookies with an object keyed by the cookie names
   app.use(bodyParser.json()); // extracts the entire body portion of an incoming request stream and exposes it on req.body

   app.get("/", (req, res) => {
      res.send("Hello World Node + Express + Typescript!!");
   });

   app.use("/auth", authRouter);
   app.use("/client", clientRouter);
   app.use("/category", categoryRouter);
   app.use("/chat", chatRouter);

   return app;
};

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI).then(() => {
   console.log("Connected to DB!");

   initializeRoles();
   initializeClients();
});
mongoose.connection.on("error", (error: Error) => console.log(error));

export { initializeApp };
