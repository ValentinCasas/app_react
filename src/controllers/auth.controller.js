import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from './../libs/jwt.js';
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { fileURLToPath } from 'url';
import { v1 as uuid } from 'uuid';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const register = async (req, res) => {
    try {
        const { username, email, password, rol } = req.body;

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ error: 'The email is already in use.' });
        }

        let imagePath = 'avatar_profile_default.png';

        if (req.files && req.files.imageFile) {
            const userImage = req.files.imageFile;
            imagePath = uuid() + path.extname(userImage.name);
            const uploadPath = path.join(__dirname, '../../client/public/images/image_profile', imagePath);
            await userImage.mv(uploadPath);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: passwordHash,
            rol: rol || 3,  
            imageUrl: imagePath,
        });

        res.json({ user: newUser });

    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ success: false, error: 'Error al registrar usuario.' });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findAll({ where: { email } });

        if (!userFound) return res.status(400).json({ message: 'User not found' })

        const isMatch = await bcrypt.compare(password, userFound[0].password);

        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

        const token = await createAccessToken({ id: userFound[0].id });
        const rol = userFound[0].rol;

        res.cookie("token", token)
        res.cookie("rol", userFound[0].rol)
        res.json({
            success: true,
            User: userFound[0],
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    })
    res.cookie('rol', "")
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    try {
        const userFound = await User.findByPk(req.user.id);

        if (!userFound) return res.status(400).json({ message: "User not found" });
        return res.json({
            User: userFound,
        });
    } catch (err) {
        res.json({ success: false, messageError: "Error al obtener perfil" })
    }
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: 'unauthorized' });

    let userFound;

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'unauthorized' });

        userFound = await User.findByPk(user.id)
        if (!userFound) return res.status(401).json({ message: 'unauthorized' });

        return res.json({
            UserFound: userFound
        });
    })
}
