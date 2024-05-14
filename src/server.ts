import { initializeApp } from "./app.js";

const PORT = 8080;
const app = initializeApp();

// app.listen is a shortcut for http.createServer
app.listen(PORT, () => {
   console.log(`Listening to port: ${PORT}`);
});
