import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from './../libs/jwt.js';

export const register = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const userFound = await User.findAll({ where: { email } });
        if (userFound[0]) return res.status(400).json(['the email is already in use'])

        const passwordHash = await bcrypt.hash(password, 10);

        const NewUser = await User.create({
            username: username,
            email: email,
            password: passwordHash
        });

        const token = await createAccessToken({
            id: NewUser.id
        });

        res.cookie('token', token)
        res.json({ User: NewUser })

    } catch (err) {
        res.json({ success: false, error: 'Error al registrar usuario ' + err });
    }

}

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
        res.json({ success: false, error: 'Error al encontrar usuario ' + err.message });
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