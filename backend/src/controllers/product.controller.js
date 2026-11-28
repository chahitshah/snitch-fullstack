
import productModel from "../models/product.model.js";
import { uploadImage } from "../services/imagekit.service.js";

export const registerProduct = async (req, res) => {
    try {
        // 1. Check uploaded images
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Product images are required"
            });
        }

        // 2. Get product details
        const {
            title,
            description,
            price,
            currency,
            stock
        } = req.body;

        // 3. Get authenticated seller ID
        const userId = req.user._id;

        // 4. Upload all images to ImageKit
        const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
                const response = await uploadImage(
                    file.buffer,
                    file.originalname
                );

                return {
                    url: response.url,
                    fileId: response.fileId
                };
            })
        );

        // 5. Create product in MongoDB
        const newProduct = await productModel.create({
            title,
            description,
            price,
            currency,
            stock,
            images: uploadedImages,
            seller: userId
        });

        // 6. Send response
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct
        });

    } catch (err) {
        console.error("Product creation error:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to register product"
        });
    }
};
