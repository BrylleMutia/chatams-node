import express, { Express, Request, Response } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter } from "./router/authRouter.js";

dotenv.config();

const PORT = 8080;
const MONGO_URI = `mongodb+srv://bryllemutia:${process.env.MONGO_PASSWORD}@cluster0.qt8cm1e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// you can explicitly annotate the types, but is not required
const app = express();

app.use(cors({ credentials: true }));
app.use(compression()); // will attempt to compress response bodies for all request
app.use(cookieParser()); // parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(bodyParser.json()); // extracts the entire body portion of an incoming request stream and exposes it on req.body

app.get("/", (req, res) => {
   res.send("Hello World Node + Express + Typescript!!");
});

const server = http.createServer(app);

server.listen(PORT, () => {
   console.log(`Listening to port: ${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI).then(() => console.log("Connected to DB!"));
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/auth", authRouter);
