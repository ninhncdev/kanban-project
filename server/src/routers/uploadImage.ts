import { Router } from "express";

import { uploadImage } from "../controllers/uploadImage";
import { upload } from "../config/multer";
const route = Router();

route.post("/upload-image", upload.single("image"), uploadImage);

export default route;
