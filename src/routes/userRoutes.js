const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil protegido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     role:
 *                       type: string
 */
router.get('/profile', authenticate, (req, res) => {
    res.json({
        message: "Protected profile data",
        user: req.user
    });
});

/**
 * @swagger
 * /api/user/admin:
 *   get:
 *     summary: Acceso al panel de administrador
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso permitido
 */
router.get('/admin', authenticate, authorize('ADMIN'), (req, res) => {
    res.json({
        message: "Admin panel access granted"
    });
});

module.exports = router;