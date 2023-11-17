import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from './../libs/jwt.js';
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { v1 as uuid } from 'uuid';
import path from 'path';


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log(req.files.imageFile)

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'The email is already in use.' });
        }

        let imagePath = '';
        let userImage;

        if (!req.files || req.files.imageFile === null) {
            imagePath = 'avatar_profile_default.png';
        } else {
            userImage = req.files.imageFile;
            imagePath = uuid() + userImage.name;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: passwordHash,
            imageUrl: imagePath,
        });

        if (userImage) {

            
            await userImage.mv('../public/images/image_profile' + imagePath);

        }

        const token = await createAccessToken({
            id: newUser.id,
        });

        res.cookie('token', token);
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

        res.cookie("token", token)
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
