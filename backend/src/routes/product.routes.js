import { Router } from "express";
import { createProductValidator } from "../validator/product.validator.js";
import { verifySeller } from "../middleware/seller.middleware.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import { uploadMiddleware } from "../middleware/upload.middleware.js";
import { registerProduct } from "../controllers/product.controller.js";

const router = Router()


router.post("/products",verifyUser,verifySeller,uploadMiddleware,createProductValidator,registerProduct)

export default router