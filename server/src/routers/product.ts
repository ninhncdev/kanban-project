import { Router } from "express";
import { getProducts } from "../controllers/products";

const route = Router();
route.get("/products", getProducts);

export default route;
