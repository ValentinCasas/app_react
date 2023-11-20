import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createProduct, getProducts, deleteProduct } from "../controllers/products.controller.js";



const router = Router();

router.post("/create", authRequired, createProduct);
router.get("/products", authRequired, getProducts);
router.delete("/delete/:id", authRequired, deleteProduct);


export default router