const bcrypt = require('bcrypt');
const prisma = require('../utils/prisma');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const generateResetToken = require('../utils/token');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

const registerUser = async (email, password) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        throw { statusCode: 400, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });
};

const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw { statusCode: 400, message: "Invalid credentials" };
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        throw { statusCode: 400, message: "Invalid credentials" };
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken }
    });

    return { accessToken, refreshToken };
};

module.exports = {
    registerUser,
    loginUser
};