import Product from "../models/product.model.js";
import { v1 as uuid } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProduct = async (req, res) => {
    const { name, description } = req.body;

    try {

        let imagePath = 'product_default.png';

        if (req.files && req.files.imageFile) {
            const productImage = req.files.imageFile;
            imagePath = uuid() + path.extname(productImage.name);
            const uploadPath = path.join(__dirname, '../../client/public/images/image_product', imagePath);
            await productImage.mv(uploadPath);
        }


        const newProduct = await Product.create({
            name: name,
            description: description,
            imageUrl: imagePath,
        });

        res.status(201).json({ product: newProduct });
    } catch (err) {
        res.status(500).send(err.message);
    }
};
