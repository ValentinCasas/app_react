import User from "../models/user.model.js";

export const register = async (req, res) => {

    try {
        const { username, email, password } = req.body;


        const newUser = await User.create(
            username,
            email,
            password
        );

        res.json({
            success: true,
            User: newUser,
        });

    } catch (err) {
        res.json({ success: false, error: 'Error al registrar usuario ' + err });
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findAll({ where: { email, password } });

        res.json({
            success: true,
            User: user,
        });

    } catch (err) {
        res.json({ success: false, error: 'Error al buscar usuario ' + err });
    }

}