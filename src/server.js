const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const rateLimit = require('express-rate-limit');


app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: "Auth system running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // máximo 10 intentos
    message: "Too many requests, try again later"
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);


const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');

app.use('/api/user', userRoutes);

const helmet = require('helmet');
app.use(helmet());

const errorHandler = require('./middlewares/errorMiddleware');
app.use(errorHandler);