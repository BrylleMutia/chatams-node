import express, { Express, Request, Response } from "express";

const PORT = 8000;

// you can explicitly annotate the types, but is not required
const app = express();

app.get("/", (req, res) => {
   res.send("Hello World Node + Express + Typescript!!");
});

app.listen(PORT, () => {
   console.log(`Listening to port: ${PORT}`);
});