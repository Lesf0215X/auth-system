# Sistema de Autenticación Backend

Sistema de autenticación completo desarrollado con Node.js, Express, Prisma y PostgreSQL.

Este proyecto implementa una arquitectura segura de autenticación con **Access Tokens, Refresh Token Rotation, recuperación de contraseña, control de roles y múltiples capas de seguridad**.

**Arquitectura backend lista para producción**

---------------------------------------------------------

# Características

El sistema incluye:

* Registro de usuarios
* Inicio de sesión seguro
* Hash de contraseñas con bcrypt
* Autenticación con Access Token + Refresh Token
* Rotación de Refresh Tokens
* Control de acceso basado en roles (RBAC)
* Rutas protegidas
* Recuperación de contraseña segura con tokens que expiran
* Cierre de sesión con invalidación del refresh token
* Protección contra ataques de fuerza bruta
* Headers HTTP seguros
* Manejo global de errores
* Validación de datos de entrada
* Base de datos PostgreSQL con Prisma ORM

------------------------------------------------------------

# Arquitectura del Proyecto

El proyecto utiliza arquitectura por capas

src
│
├── controllers
│   Manejan las solicitudes y respuestas HTTP
│
├── services
│   Contienen la lógica de negocio
│
├── routes
│   Definen los endpoints de la API
│
├── middlewares
│   Autenticación, autorización y seguridad
│
├── validators
│   Esquemas de validación de datos
│
├── utils
│   Utilidades (JWT, generación de tokens, Prisma)
│
└── server.js
    Punto de entrada de la aplicación


Esta estructura mejora:

* Mantenibilidad del código
* Escalabilidad del sistema
* Claridad del proyecto
* Facilidad para realizar pruebas

-----------------------------------------------------------------------------------------------

# Seguridad Implementada

Este sistema incluye varias prácticas de seguridad utilizadas en aplicaciones reales:

* Hash de contraseñas con **bcrypt**
* Autenticación con **JSON Web Tokens (JWT)**
* Arquitectura **Access Token + Refresh Token**
* **Rotación de Refresh Tokens**
* Almacenamiento del refresh token en base de datos
* Tokens seguros para recuperación de contraseña
* Expiración automática de tokens
* Protección de rutas basada en roles
* Protección contra ataques de fuerza bruta con **rate limiting**
* Headers HTTP seguros usando **Helmet**

-----------------------------------------

# Tecnologías Utilizadas

Backend:

* Node.js
* Express.js

Autenticación y seguridad:

* JSON Web Tokens (JWT)
* bcrypt
* express-rate-limit
* helmet

Base de datos:

* PostgreSQL
* Prisma ORM

Validación:

* Zod

Herramientas de desarrollo:

* Nodemon
* Docker

---------------------------------------------------------------

# Variables de Entorno

Debes crear un archivo `.env` en la raíz del proyecto.

Ejemplo:


DATABASE_URL=tu_url_de_base_de_datos

JWT_ACCESS_SECRET=tu_secreto_access
JWT_REFRESH_SECRET=tu_secreto_refresh

ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

PORT=3000


----------------------------------------------------------------------

# Instalación

Clonar el repositorio:

git clone https://github.com/tuusuario/auth-system.git

Instalar dependencias:

npm install

Ejecutar migraciones de base de datos:

npx prisma migrate dev

Crear usuario administrador con seed:

npx prisma db seed

Ejecutar el servidor:

npm run dev

El servidor se ejecutará en:

http://localhost:3000

-----------------------------------------------------------------------------

# Endpoints de la API

## Autenticación

### Registro de usuario

  POST /api/auth/register

### Inicio de sesión

  POST /api/auth/login

### Renovar Access Token

  POST /api/auth/refresh

### Cerrar sesión

  POST /api/auth/logout

### Solicitar recuperación de contraseña

  POST /api/auth/forgot-password

### Restablecer contraseña

  POST /api/auth/reset-password

----------------------------------------------------------

# Rutas Protegidas

### Perfil de usuario

  GET /api/user/profile

Requiere header:

  Authorization: Bearer ACCESS_TOKEN

---------------------------------------------------

### Ruta para administrador

GET /api/user/admin

Requiere:

* Access Token válido
* Rol de administrador

-----------------------------------------------------------

# Docker

Construir la imagen:

  docker build -t auth-system .

Ejecutar el contenedor:

  docker run -p 3000:3000 auth-system

-------------------------------------------------------------------

# Despliegue

El proyecto está listo para desplegarse en servicios como:

* Render
* Railway
* Servidores con Docker

--------------------------------------------------------------------------------------------------------------------------------------------

# Objetivo del Proyecto

Este proyecto fue desarrollado para demostrar la implementación de un sistema de autenticación seguro utilizado en aplicaciones modernas.

Incluye prácticas utilizadas en entornos reales como:

* Rotación de tokens
* Autorización basada en roles
* Recuperación segura de contraseña
* Arquitectura backend por capas

--------------------------------------------------------------------------------------------------------------

# Autor

Luis Enrique Soriano Flores.
