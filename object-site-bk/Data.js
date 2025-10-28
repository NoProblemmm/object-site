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
    time: "02:49",
    image: `${process.env.BASE_URL}/media/track-1.jpg`,
    url: `${process.env.BASE_URL}/media/track-1.mp3`,
  },
  {
    id: 2,
    name: "Track 2",
    author: "NoNmae 2",
    time: "02:06",
    image: `${process.env.BASE_URL}/media/track-2.jpg`,
    url: `${process.env.BASE_URL}/media/track-2.mp3`,
  },
  {
    id: 3,
    name: "Track 3",
    author: "NoName 3",
    time: "03:07",
    image: `${process.env.BASE_URL}/media/track-3.jpg`,
    url: `${process.env.BASE_URL}/media/track-3.mp3`,
  },
  {
    id: 4,
    name: "Track 4",
    author: "NoName 4",
    time: "02:49",
    image: `${process.env.BASE_URL}/media/track-4.jpg`,
    url: `${process.env.BASE_URL}/media/track-4.mp3`,
  },
  {
    id: 5,
    name: "DAO",
    author: "Miyagi feat. HLOY, даена",
    time: "03:42",
    image: `${process.env.BASE_URL}/media/track-5.jpg`,
    url: `${process.env.BASE_URL}/media/track-5.mp3`,
  },
];

export const UserTrack = [
  {
    idUser: 1,
    idTrack: 1,
  },
  {
    idUser: 1,
    idTrack: 3,
  },
];

export const JWT = [{}];
