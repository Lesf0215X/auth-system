const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middlewares globales

app.use(helmet());
app.use(cors());
app.use(express.json());

// limitador

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // máximo 10 intentos
    message: { message: "Too many requests, try again later" }
});

//Render

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "auth-system"
    });
});

// Root endpoint

app.get('/', (req, res) => {
    res.json({ message: "Auth system running" });
});

//Rutas

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// ERror

const errorHandler = require('./middlewares/errorMiddleware');
app.use(errorHandler);

//Server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});