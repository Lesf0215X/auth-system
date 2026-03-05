const swaggerJSDoc = require('swagger-jsdoc');

const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://auth-system-9k3x.onrender.com"
    : "http://localhost:3000";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Authentication API",
      version: "1.0.0",
      description: "API de autenticación con JWT"
    },
    servers: [
      {
        url: serverUrl
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };
