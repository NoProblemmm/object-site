import express from "express";
import {
  signIn,
  signUp,
  myTrack,
  refreshMyToken,
  track,
  addMyTrack,
  deleteMyTrack,
} from "./src/path/path.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authenticateJWT } from "./src/common/token/Token.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: `http://localhost:5173`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  "/media",
  express.static("media/tracks/"),
  express.static("media/imageTrack/")
);

// POST
app.post("/signIn", (req, res) => {
  signIn(req, res);
});

app.post("/signUp", (req, res) => {
  signUp(req, res);
});

app.post("/refresh-token", (req, res) => {
  refreshMyToken(req, res);
});

app.post("/add-mytrack", authenticateJWT, (req, res) => {
  addMyTrack(req, res);
});

// GET
app.get("/tracks", (req, res) => {
  track(req, res);
});

app.get("/my-tracks", authenticateJWT, (req, res) => {
  myTrack(req, res);
});

// DELETE
app.delete("/delete-mytrack", authenticateJWT, (req, res) => {
  deleteMyTrack(req, res);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
