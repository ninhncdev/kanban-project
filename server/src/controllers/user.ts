import UserModel from "../models/UserModel";
import "dotenv/config";
import bcrypt from "bcrypt";
import { getAccessToken } from "../utils/getAccessToken";
import generatorRandomText from "../utils/generatorRandomText";
const register = async (req: any, res: any) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      throw new Error("Tài khoản đã tồn tại");
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    body.password = hashedPassword;
    const newUser: any = new UserModel(body);
    await newUser.save();

    const { password: _, ...userObj } = newUser._doc;
    const token = await getAccessToken({
      _id: newUser._id,
      email: newUser.email,
      rule: 1,
    });
    res.status(200).json({
      message: "User registered successfully",
      data: {
        ...userObj,
        token,
      },
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
const loginWithGoogle = async (req: any, res: any) => {
  const body = req.body;
  const { email, name } = body;
  try {
    const user: any = await UserModel.findOne({ email: email });

    if (user) {
      const { password: _, ...userData } = user._doc;
      res.status(200).json({
        message: "Login with Google successfully",
        data: {
          ...userData,
          token: await getAccessToken({
            _id: user._id,
            email: user.email,
            rule: 1,
          }),
        },
      });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(generatorRandomText(6), salt);
    body.password = hashedPassword;
    const newUser: any = new UserModel(body);
    await newUser.save();

    const { password: _, ...userObj } = newUser._doc;
    res.status(200).json({
      message: "Login with Google successfully",
      data: {
        ...userObj,
        token: await getAccessToken({
          _id: newUser._id,
          email: newUser.email,
          rule: 1,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
const login = async (req: any, res: any) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const user: any = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }
    const token = await getAccessToken({
      _id: user._id,
      email: user.email,
      rule: 1,
    });

    const { password: _, ...userData } = user._doc;

    res.status(200).json({
      message: "Đăng nhập thành công",
      data: { ...userData, token },
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
const refreshToken = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const user: any = UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const token = await getAccessToken({
      _id: id,
      email: user.email,
      rule: user.rule,
    });
    res.status(200).json({
      message: "Success!",
      data: token,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
export { register, login, loginWithGoogle, refreshToken };
