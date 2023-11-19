import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createProduct } from "../controllers/products.controller.js";



const router = Router();

router.post("/create", authRequired, createProduct);


export default router