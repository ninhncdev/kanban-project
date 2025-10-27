import { Router } from "express";
import { register, login, loginWithGoogle } from "../controllers/user";

const route = Router();
route.post("/register", register);
route.post("/login", login);
route.post("/google-sign", loginWithGoogle);
export default route;
