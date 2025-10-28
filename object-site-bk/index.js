import express from "express";
import { login, myTrack, refreshMyToken, track } from "./src/path/path.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Track, UserTrack } from "./Data.js";
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

app.post("/login", (req, res) => {
  login(req, res);
});

app.post("/refresh-token", (req, res) => {
  refreshMyToken(req, res);
});

app.get("/tracks", (req, res) => {
  track(req, res);
});

app.get("/my-tracks", authenticateJWT, (req, res) => {
  myTrack(req, res);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
