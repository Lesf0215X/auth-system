const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const morgan = require('morgan');

// Swagger
const { swaggerSpec } = require('./docs/swagger.js');

// Import routes
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// Import middleware
const errorHandler = require('./middlewares/errorMiddleware.js');

const app = express();

app.set('trust proxy', 1);

// Middlewares globales
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger Documentation

const swaggerUiOptions = {
    explorer: true
};

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

// Rate limiter para autenticación

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // máximo 10 intentos
    message: {
        message: "Demasiadas peticiones desde esta IP, intenta más tarde."
    }
});

// Health Check (para Render)

app.get('/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
    service: "auth-system"
  });
});

// Root endpoint

app.get('/', (req, res) => {
    res.json({
        message: 'Auth system running'
    });
});

// Aplicar rate limiter

app.use('/api/auth', authLimiter);
app.use('/api/auth/register', authLimiter);

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Error Handler

app.use(errorHandler);

// Server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Export app (para testing o futuras mejoras)
module.exports = app;