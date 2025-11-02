import jwt from "jsonwebtoken";
export const verifyToken = async (req: any, res: any, next: any) => {
  const headers = req.headers.authorization;
  const accessToken = headers ?? "";
  try {
    if (!accessToken) {
      res.status(404).json({
        message: "khong co quyen truy cap",
      });
    }
    const verify: any = jwt.verify(
      accessToken,
      process.env.SECRET_KEY as string
    );
    if (!verify) {
      throw new Error("Invalid Token");
    }
    req._id = verify._id;
    next();
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
