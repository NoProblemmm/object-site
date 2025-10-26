import dotenv from "dotenv";
dotenv.config();

export const User = [
  {
    id: 1,
    name: "Artur",
    email: "test1@mail.ru",
    password: "Test123!",
  },
];

export const Track = [
  {
    id: 1,
    name: "Track 1",
    author: "NoNmae",
    image: `${process.env.BASE_URL}/media/retro-design-2.jpg`,
    url: `${process.env.BASE_URL}/media/track-1.mp3`,
  },
  {
    id: 2,
    name: "Track 2",
    author: "NoNmae 2",
    image: `${process.env.BASE_URL}/media/retro-design-3.jpg`,
    url: `${process.env.BASE_URL}/media/track-2.mp3`,
  },
];

export const UserTrack = [
  {
    idUser: 1,
    idTrack: 1,
  },
  {
    idUser: 1,
    idTrack: 2,
  },
];

export const JWT = [{}];
