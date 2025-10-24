import express from "express";
import { authorizeUser } from "./authorization.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const result = authorizeUser(email, password);

  if (result.success) {
    res.json({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } else {
    res.status(401).json({ message: result.message });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
