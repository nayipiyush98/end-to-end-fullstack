import fs from "fs";
import path from "path";
import multer from "multer";
import { _file } from "zod/v4/core";

const uploadPath = path.join(process.cwd(), "scripts", "public", "images");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

export const uploadProductImages = multer({
    storage,
    limits:{
        files:5,
        fileSize:5*1024*1024,
    },
    fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
})
