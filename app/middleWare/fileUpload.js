import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "leads",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export const upload = multer({ storage });


export const uploadMultiple = upload.single("Image");


// export const generateFileUrl = (req, res, next) => {
//   let fileUrls = [];

//   if (req.files && req.files.length > 0) {
//     fileUrls = req.files.map((file) => file.path); 
//   }

//   req.fileUrls = fileUrls;
//   next();
// };
export const generateFileUrl = (req, res, next) => {
  let fileUrl = null;

  if (req.file) {
    fileUrl = req.file.path; // cloudinary URL
  }

  req.fileUrl = fileUrl; // STRING
  next();
};