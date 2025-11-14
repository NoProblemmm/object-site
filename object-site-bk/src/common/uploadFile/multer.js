import multer from "multer";

export const uploadAvatarImage = (userID) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "object-site-bk/media/profileImage/");
    },
    filename: function (req, file, cb) {
      cb(null, `user-${userId}.jpg`);
    },
  });
  const uploadImage = multer({ storage });
  return uploadImage;
};
