# Auth System

Sistema de autenticación backend seguro desarrollado con **Node.js, Express, Prisma y PostgreSQL**.

Este proyecto implementa una arquitectura moderna de autenticación basada en **Access Tokens + Refresh Tokens**, incluyendo rotación de tokens, recuperación de contraseña y control de acceso por roles.

El objetivo del proyecto es demostrar la implementación de un **sistema de autenticación listo para producción** siguiendo buenas prácticas utilizadas en aplicaciones reales.

---

# Características

- Registro de usuarios
- Inicio de sesión seguro
- Hash de contraseñas con **bcrypt**
- Autenticación con **JWT**
- Arquitectura **Access Token + Refresh Token**
- **Rotación de Refresh Tokens**
- Recuperación de contraseña segura
- Envío de correos electrónicos
- Control de acceso basado en roles (**RBAC**)
- Rutas protegidas
- Protección contra **ataques de fuerza bruta**
- **Rate limiting**
- Headers HTTP seguros con **Helmet**
- Validación de datos con **Zod**
- Arquitectura backend por capas

---

# Tecnologías Utilizadas

Backend:

    Node.js
    Express.js

Autenticación y seguridad:

    JSON Web Tokens (JWT)
    bcrypt
    express-rate-limit
    helmet

Base de datos:

    PostgreSQL
    Prisma ORM

Validación:

    Zod

Herramientas de desarrollo:

    Nodemon
    Docker

---

# Arquitectura del Proyecto

El proyecto sigue una arquitectura por capas para mejorar la mantenibilidad y escalabilidad.

```text
src/
│
├── controllers/
│   Manejan las solicitudes y respuestas HTTP
│
├── services/
│   Contienen la lógica de negocio
│
├── routes/
│   Definen los endpoints de la API
│
├── middlewares/
│   Autenticación, autorización y seguridad
│
├── validators/
│   Esquemas de validación de datos
│
├── utils/
│   Utilidades (JWT, generación de tokens, Prisma)
│
└── server.js
    Punto de entrada de la aplicación

Esta arquitectura permite:

- separar responsabilidades
- escalar el proyecto fácilmente
- mejorar mantenibilidad
- facilitar testing

---

# Seguridad Implementada

El sistema incluye múltiples capas de seguridad:

- Hash de contraseñas con **bcrypt**
- Tokens **JWT**
- Arquitectura **Access + Refresh Tokens**
- **Rotación de refresh tokens**
- Tokens seguros para recuperación de contraseña
- Expiración automática de tokens
- Protección contra **brute force**
- Seguridad HTTP con **Helmet**
- Validación de datos de entrada

---

# Recuperación de Contraseña

El sistema incluye un flujo seguro para recuperación de contraseña.

Proceso:

1. El usuario solicita recuperación de contraseña.
2. Se genera un **token seguro aleatorio**.
3. El token se guarda en base de datos con expiración.
4. Se envía un correo electrónico con un enlace.
5. El usuario establece una nueva contraseña.
6. El token se invalida automáticamente.

Esto evita enviar contraseñas por correo y protege contra ataques.

---

# Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto.


DATABASE_URL=postgresql://user:password@localhost:5432/authdb

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_app_password

PORT=3000


---

# Instalación

Clonar repositorio


git clone https://github.com/Lesf0215X/auth-system.git


Entrar al proyecto


cd auth-system


Instalar dependencias


npm install


Ejecutar migraciones


npx prisma migrate dev


Ejecutar servidor


npm run dev


Servidor disponible en


http://localhost:3000


---

# Endpoints Principales

## Autenticación

### Registro


POST /api/auth/register


### Login


POST /api/auth/login


### Refresh Token


POST /api/auth/refresh


### Logout


POST /api/auth/logout


---

## Recuperación de contraseña

### Solicitar recuperación


POST /api/auth/forgot-password


### Restablecer contraseña


POST /api/auth/reset-password


---

# Rutas Protegidas

### Perfil de usuario


GET /api/user/profile


Header requerido:


Authorization: Bearer ACCESS_TOKEN


---

### Ruta de administrador


GET /api/user/admin


Requiere:

- Access token válido
- Rol **admin**

---

# Docker

Construir imagen


docker build -t auth-system .


Ejecutar contenedor


docker run -p 3000:3000 auth-system


---

# API desplegada


https://auth-system-9k3x.onrender.com


---

# Documentación Swagger


https://auth-system-9k3x.onrender.com/api-docs


---

# Objetivo del Proyecto

Este proyecto fue desarrollado como parte de un portafolio profesional para demostrar conocimientos en:

- Arquitectura backend
- Seguridad en autenticación
- Diseño de APIs
- Manejo de tokens JWT
- Control de acceso por roles
- Buenas prácticas en Node.js

---

# Autor

Luis E.S.F.