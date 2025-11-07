import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

export const uploadImage = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Vui lòng chọn file để upload" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    res.status(200).json({
      message: "Upload thành công",
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Lỗi upload ảnh", error: error.message });
  }
};
