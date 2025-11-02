import { Router } from "express";
import {
  register,
  login,
  loginWithGoogle,
  refreshToken,
} from "../controllers/user";
import { verifyToken } from "../middleware/verifylToken";

const route = Router();
route.post("/register", register);
route.post("/login", login);
route.post("/google-sign", loginWithGoogle);
route.get("/refresh-token", refreshToken);
export default route;
