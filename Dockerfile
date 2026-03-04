FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copiar prisma schema antes de generar cliente
COPY prisma ./prisma

RUN npx prisma generate

# Ahora copiar el resto del proyecto
COPY . .

EXPOSE 3000

CMD ["npm", "start"]