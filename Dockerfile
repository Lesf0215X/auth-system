FROM node:20

WORKDIR /app

# copiar package.json
COPY package*.json ./

# copiar prisma schema antes de instalar dependencias
COPY prisma ./prisma

# instalar dependencias (esto ejecutará postinstall -> prisma generate)
RUN npm install

# copiar el resto del proyecto
COPY . .

EXPOSE 3000

CMD ["npm", "start"]