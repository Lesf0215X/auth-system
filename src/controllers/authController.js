const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const prisma = require('../utils/prisma');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const generateResetToken = require('../utils/token');

const authService = require('../services/authService');
const { registerSchema, loginSchema } = require('../validators/authValidator');


// Register
const register = async (req, res, next) => {
    try {
        registerSchema.parse(req.body);

        const { email, password } = req.body;
        await authService.registerUser(email, password);

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        next(error);
    }
};


// Login
const login = async (req, res, next) => {
    try {
        loginSchema.parse(req.body);

        const { email, password } = req.body;
        const tokens = await authService.loginUser(email, password);

        res.json(tokens);

    } catch (error) {
        next(error);
    }
};


// Refresh token 
const refresh = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token required" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token - possible reuse detected" });
        }

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: newRefreshToken }
        });

        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });

    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};


// Logout
const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token required" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        await prisma.user.update({
            where: { id: decoded.id },
            data: { refreshToken: null }
        });

        res.json({ message: "Logged out successfully" });

    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};


// Forgot pass
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const resetToken = generateResetToken();

        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        await prisma.user.update({
            where: { email },
            data: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000) // 15 minutos
            }
        });

        res.json({
            message: "Password reset token generated",
            resetToken // solo para pruebas
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Reiniciar contraseña
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: {
                    gt: new Date()
                }
            }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
                refreshToken: null
            }
        });

        res.json({ message: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    register,
    login,
    refresh,
    logout,
    forgotPassword,
    resetPassword
};