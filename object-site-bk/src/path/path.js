import { authorizeUser } from "../service/authorization.js";
import { Track, UserTrack } from "../../Data.js";
import { generateTokens } from "../common/token/Token.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// Обработка Логина
export const login = (req, res) => {
  const { email, password } = req.body;
  const result = authorizeUser(email, password);

  if (result.success) {
    res.json({
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } else {
    throw Error("Неверные данные!");
  }

  return res;
};

// Обновление токена
export const refreshMyToken = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Требуется refresh-токен" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    if (decoded.exp <= Math.floor(Date.now() / 1000)) {
      const tokens = generateTokens(decoded.userId, decoded.email);
      return res.json(tokens);
    } else {
      const newAccessToken = generateTokens(
        decoded.userId,
        decoded.email
      ).accessToken;
      return res.json({ accessToken: newAccessToken });
    }
  } catch (err) {
    console.error("Ошибка при проверке токена:", err);
    res
      .status(401)
      .json({ message: "Некорректный или устаревший refresh-токен" });
  }
  return res;
};

// Обработка получения объектов mp3
export const track = (req, res) => {
  const tracks = Track.map((track) => ({
    id: track.id,
    name: track.name,
    author: track.author,
    image: track.image,
    url: track.url,
  }));

  return res.json(tracks);
};

// Обработка получения объектов Track (ManyToMany) User
export const myTrack = (req, res) => {
  const userId = req.user.userId.id;
  const userTracks = UserTrack.filter((ut) => ut.idUser === userId);

  const tracksForUser = userTracks
    .map((ut) => {
      const track = Track.find((tr) => tr.id === ut.idTrack);
      return track ? track : null;
    })
    .filter(Boolean);
  res.json(tracksForUser);
};
