import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authenticateJWT } from "./src/common/token/Token.js";
import { socketLogic } from "./src/service/socket.js";
import {
  signIn,
  signUp,
  myTrack,
  refreshMyToken,
  searchTrack,
  track,
  addMyTrack,
  deleteMyTrack,
  getMyProfile,
  requestComposerUser,
  setAvatarUser,
} from "./src/path/path.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const server = createServer(app);

app.use(
  cors({
    origin: `${process.env.BASE_CORS_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  "/media",
  express.static("media/tracks/"),
  express.static("media/imageTrack/"),
  express.static("media/profileImage/")
);

// Socket
socketLogic(server);

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

app.post("/requestComposeUser", authenticateJWT, (req, res) => {
  requestComposerUser(req, res);
});

app.post("/setAvatarUser", authenticateJWT, (res, req) => {
  setAvatarUser(req, res);
});

// GET
app.get("/tracks", (req, res) => {
  track(req, res);
});

app.get("/my-tracks", authenticateJWT, (req, res) => {
  myTrack(req, res);
});

app.get("/searchTrack", (req, res) => {
  searchTrack(req, res);
});

app.get("/getMyProfile", authenticateJWT, (req, res) => {
  getMyProfile(req, res);
});

// DELETE
app.delete("/delete-mytrack", authenticateJWT, (req, res) => {
  deleteMyTrack(req, res);
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
