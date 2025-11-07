import { Router } from "express";
import { addNew } from "../controllers/suppliers";

const route = Router();

route.post("/add-new", addNew);

export default route;
